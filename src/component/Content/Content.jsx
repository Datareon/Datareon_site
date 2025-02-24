import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "antd";
import c from "./Content.module.css";
import image from "../../img/imgpsh_2.png";
import AlertNotification from "../AlertNotification/AlertNotification.jsx";
import basket from "../../img/icons8-basket-48.png";
import CardModal from "../CardModal/CardModal.jsx";
import BasketModal from "../BasketModal/BasketModal.jsx";

const { Meta } = Card;

const Content = ({ token }) => {
    const [visibleCards, setVisibleCards] = useState(new Set());
    const [alerts, setAlerts] = useState([]);
    const [data, setData] = useState([]);
    const [counts, setCounts] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleCard, setIsModalVisibleCard] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (!token) return;
        getData();
        const interval = setInterval(() => getData(), 30000);
        return () => clearInterval(interval);
    }, [token]);

    useEffect(() => {
        if (data.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                setVisibleCards((prev) => {
                    const newVisible = new Set(prev);
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            newVisible.add(entry.target.dataset.index);
                        }
                    });
                    return newVisible;
                });
            },
            { threshold: 0.6 }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardsRef.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, [data]);

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
            if (Array.isArray(jsonData)) setData(jsonData);
            else {
                console.error("Expected array, got:", jsonData);
                setData([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setData([]);
        }
    };

    const updateCount = (key, change) => {
        setCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts };
            const newCount = (updatedCounts[key] || 0) + change;
            updatedCounts[key] = Math.max(newCount, 0);
            return updatedCounts;
        });
    };

    const handleAddToCart = (key) => {
        updateCount(key, 1);
        const id = Date.now();
        setAlerts((prevAlerts) => [...prevAlerts, id]);
        setTimeout(() => setAlerts((prevAlerts) => prevAlerts.filter((alertId) => alertId !== id)), 3000);
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
                            ref={(el) => (cardsRef.current[index] = el)}
                        >
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={image} />}
                                onClick={() => {
                                    setSelectedCard(item);
                                    setIsModalVisibleCard(true);
                                }}
                            >
                                <Meta title={item.Наименование} description={item.Наименование} />
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

            <AlertNotification alerts={alerts} />

            <div className={c.basketDiv} onClick={() => setIsModalVisible(true)}>
                <img src={basket} alt="Корзина" className={c.basket} />
            </div>

            <BasketModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                counts={counts}
                updateCount={updateCount}
                handleAddToCart={handleAddToCart}
                data={data}
                token={token}
            />

            <CardModal 
                isVisible={isModalVisibleCard} 
                onClose={() => setIsModalVisibleCard(false)} 
                card={selectedCard} 
            />
        </>
    );
};

export default Content;
