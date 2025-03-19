import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "antd";
import c from "./Content.module.css";
import image from "../../img/imgpsh_2.png";
import AlertNotification from "../AlertNotification/AlertNotification.jsx";
import basket from "../../img/icons8-basket-48.png";
import CardModal from "../CardModal/CardModal.jsx";
import BasketModal from "../BasketModal/BasketModal.jsx";

const { Meta } = Card;

// Компонент для отображения списка товаров с возможностью добавления в корзину
const Content = ({ token }) => {
    // Состояние для отслеживания видимых карточек
    const [visibleCards, setVisibleCards] = useState(new Set());
    // Состояние для отображения уведомлений о добавлении в корзину
    const [alerts, setAlerts] = useState([]);
    // Состояние для данных о товарах
    const [data, setData] = useState([]);
    // Состояние для отслеживания количества товаров в корзине
    const [counts, setCounts] = useState({});
    // Состояние для отображения модальных окон
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleCard, setIsModalVisibleCard] = useState(false);
    // Состояние для хранения выбранной карточки товара
    const [selectedCard, setSelectedCard] = useState(null);
    // Ссылка для хранения элементов карточек для отслеживания их видимости
    const cardsRef = useRef([]);

    // Эффект для загрузки данных о товарах с сервера и повторной загрузки каждые 10 секунд
    useEffect(() => {
        if (!token) return; // Если токен не передан, не выполняем запрос
        getData(); // Запрашиваем данные с сервера
    }, [token]);

    // Эффект для отслеживания видимости карточек товаров
    useEffect(() => {
        if (data.length === 0) return; // Если данных нет, ничего не делаем

        // Создаем observer для отслеживания видимости карточек
        const observer = new IntersectionObserver(
            (entries) => {
                setVisibleCards((prev) => {
                    const newVisible = new Set(prev);
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) { // Если карточка появилась в видимой области
                            newVisible.add(entry.target.dataset.index); // Добавляем индекс карточки в список видимых
                        }
                    });
                    return newVisible;
                });
            },
            { threshold: 0.6 } // Карточка считается видимой, если она больше чем на 60% в области видимости
        );

        // Применяем observer ко всем карточкам
        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        // Очистка observer при размонтировании компонента
        return () => {
            cardsRef.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, [data]);

    // Функция для загрузки данных с сервера
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:3444/getApiData", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
            
            const jsonData = await response.json();
            if (Array.isArray(jsonData)) setData(jsonData); // Если данные - массив, обновляем состояние
            else {
                console.error("Expected array, got:", jsonData);
                setData([]); // Если данные не массив, очищаем состояние
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setData([]); // При ошибке очищаем данные
        }
    };

    // Функция для обновления количества товаров в корзине
    const updateCount = (key, change) => {
        setCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts };
            const newCount = (updatedCounts[key] || 0) + change;
            updatedCounts[key] = Math.max(newCount, 0); // Количество не может быть меньше 0
            return updatedCounts;
        });
    };

    // Функция для добавления товара в корзину и отображения уведомления
    const handleAddToCart = (key) => {
        updateCount(key, 1); // Увеличиваем количество товара
        const id = Date.now(); // Генерируем уникальный ID для уведомления
        setAlerts((prevAlerts) => [...prevAlerts, id]); // Добавляем уведомление в список
        setTimeout(() => setAlerts((prevAlerts) => prevAlerts.filter((alertId) => alertId !== id)), 3000); // Удаляем уведомление через 3 секунды
    };

    return (
        <>
            <div className={c.wrapper}>
                {data.map((item, index) => {
                    const itemId = String(item.Идентификатор);
                    return (
                        <div
                            key={itemId}
                            data-index={index}
                            className={`${c.cards} ${visibleCards.has(index.toString()) ? c.visible : ""}`}
                            ref={(el) => (cardsRef.current[index] = el)} // Привязываем каждую карточку к рефу
                        >
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={image} />}
                                onClick={() => {
                                    setSelectedCard(item); // Сохраняем выбранный товар
                                    setIsModalVisibleCard(true); // Показываем модальное окно с информацией о товаре
                                }}
                            >
                                <Meta title={item.Наименование} description={item.Категория} />
                            </Card>
                            <div className={c.buttons}>
                                <Button onClick={() => updateCount(itemId, -1)}> - </Button>
                                <div className={c.counter}>{counts[itemId] || 0}</div>
                                <Button onClick={() => handleAddToCart(itemId)}> + </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Компонент для отображения уведомлений о добавлении в корзину */}
            <AlertNotification alerts={alerts} />

            {/* Иконка корзины, по клику открывает модальное окно с корзиной */}
            <div className={c.basketDiv} onClick={() => setIsModalVisible(true)}>
                <img src={basket} alt="Корзина" className={c.basket} />
            </div>

            {/* Модальное окно корзины */}
            <BasketModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                counts={counts}
                updateCount={updateCount}
                handleAddToCart={handleAddToCart}
                data={data}
                token={token}
            />

            {/* Модальное окно с информацией о товаре */}
            <CardModal 
                isVisible={isModalVisibleCard} 
                onClose={() => setIsModalVisibleCard(false)} 
                card={selectedCard} 
            />
        </>
    );
};

export default Content;
