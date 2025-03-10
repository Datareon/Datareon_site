import React from "react";
import { Modal, ConfigProvider } from "antd";
import image from "../../img/imgpsh_2.png";
import cm from "./CardModal.module.css"; 

// Компонент CardModal отображает подробную информацию о товаре в модальном окне
const CardModal = ({ isVisible, onClose, card }) => {
    // Если информация о карточке отсутствует, ничего не рендерим
    if (!card) return null;

    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        contentBg: "#F5F5F5",
                        headerBg: "#F5F5F5"
                    },
                },
            }}
        >
            {/* Модальное окно с информацией о товаре */}
            <Modal title={card.Наименование} open={isVisible} onCancel={onClose} centered={true} footer={null} width={"50%"}>
                <div className={cm.mainContent}>
                    {/* Изображение товара */}
                    <img src={image} alt={card.Наименование} style={{ width: "65%", marginBottom: "20px" }} />
                    <div className={cm.description}>
                        <div className={cm.mainText}>
                            {/* Основная информация о товаре */}
                            <p><span className={cm.span}>Категория:</span>{card.Категория}</p>
                            <p><span className={cm.span}>Описание:</span><br />{card.Описание}</p>
                            <p><span className={cm.span}>Производитель:</span>{card.Производитель}</p>
                            <p><span className={cm.span}>Артикул:</span>{card.Артикул}</p> 
                            <p><span className={cm.span}>Штрихкод:</span>{card.Штрихкод}</p>
                            <p><span className={cm.span}>НДС:</span>{card.НДС}</p>  
                            <p><span className={cm.span}>Остаток:</span>{card.Остаток}</p>
                            <p><span className={cm.span}>Характеристики:</span></p>
                            {/* Характеристики товара */}
                            <div className={cm.characteristics}>
                                {card.Характеристики.map((item, index) => (
                                    <div key={index}>
                                        <p><span className={cm.spanTabl}>Тип:</span>{item.Тип}</p>
                                        <p><span className={cm.spanTabl}>Модель:</span>{item.Модель}</p>
                                        <p><span className={cm.spanTabl}>Вес:</span>{item.Вес}</p>
                                        <p><span className={cm.spanTabl}>Размеры:</span>{item.Размеры}</p>
                                    </div>
                                ))}
                            </div>  
                            <p><span className={cm.span}>Гарантия:</span></p>
                            {/* Информация о гарантии */}
                            <div className={cm.warranty}>
                                {card.Гарантия.map((item, index) => (
                                    <div key={index}>
                                        <p><span className={cm.spanTabl}>Тип гарантии:</span>{item.Тип_гарантии}</p>
                                        <p><span className={cm.spanTabl}>Гарантийный срок:</span>{item.Гарантийный_срок} месяцев</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Цена товара с учетом валюты */}
                        <div className={cm.price}>
                            {card.Валюта === "Рубль" ? (
                                <p><span>{card.Стоимость}</span> ₽</p>
                            ) : (
                                <p><span>{card.Стоимость}</span> $</p>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default CardModal;
