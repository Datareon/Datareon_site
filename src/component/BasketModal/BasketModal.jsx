import React from "react";
import { Card, Button, Modal, message } from "antd";
import b from "./BasketModal.module.css";
import image from "../../img/imgpsh_2.png";

const { Meta } = Card;

const BasketModal = ({ isVisible, onClose, counts, updateCount, handleAddToCart, data }) => {
    const handleOrderSubmit = async () => {
        const orderData = Object.keys(counts)
            .filter((key) => counts[key] > 0)
            .map((key) => {
                const item = data.find((item) => String(item.Код) === key);
                return {
                    dummyField: 0,
                    id: item.Код,
                    name: item.Наименование,
                    quantity: counts[key],
                };
            });

        try {
            const response = await fetch("http://localhost:3444/sendJson", {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                message.success("Заказ успешно оформлен!");
                onClose();
            } else {
                message.error("Ошибка при оформлении заказа");
            }
        } catch (error) {
            message.error("Ошибка соединения с сервером");
            console.error("Ошибка:", error);
        }
    };

    return (
        <Modal
            title="Корзина"
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width="700px"
        >
            {Object.keys(counts).some((key) => counts[key] > 0) ? (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <div className={b.wrapperModal}>
                        {Object.keys(counts).map((key) => {
                            if (counts[key] > 0) {
                                const item = data.find((item) => String(item.Код) === key);
                                return (
                                    <div key={item.Код} className={b.cardsModal}>
                                        <Card hoverable style={{ width: 240 }} cover={<img alt="example" src={image} />}>
                                            <Meta title={item.Наименование} description={item.Наименование} />
                                        </Card>
                                        <div className={b.buttons}>
                                            <Button onClick={() => updateCount(item.Код, -1)}> - </Button>
                                            <div className={b.counter}>{counts[item.Код]}</div>
                                            <Button onClick={() => handleAddToCart(item.Код)}> + </Button>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <Button type="primary" onClick={handleOrderSubmit}>Оформить заказ</Button>
                </div>
            ) : (
                <p>Корзина пуста</p>
            )}
        </Modal>
    );
};

export default BasketModal;
