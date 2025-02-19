import React from "react";
import { Card, Button, Modal, message, Form, Input } from "antd";
import b from "./BasketModal.module.css";
import image from "../../img/imgpsh_2.png";

const { Meta } = Card;

const BasketModal = ({ isVisible, onClose, counts, updateCount, handleAddToCart, data, token }) => {
    const handleOrderSubmit = async (values) => {
        const orderData = {
            email: values.email, // Отдельное поле email
            order: Object.keys(counts)
                .filter((key) => counts[key] > 0)
                .map((key) => {
                    const item = data.find((item) => String(item.Код) === key);
                    return {
                        dummyField: 0,
                        id: item.Код,
                        name: item.Наименование,
                        quantity: counts[key],
                    };
                }),
        };

        try {
            const response = await fetch("http://localhost:3444/sendJson", {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(orderData), // Отправляем новый формат JSON
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

    const validateMessages = {
        required: 'Обязательное поле!',
        types: {
            email: 'Некорректный email!',
        },
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
                    alignItems: "center",
                    textAlign: 'center'
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
                    <Form
                        name="Email form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={handleOrderSubmit}
                        autoComplete="off"
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: 'email' }]}
                        >
                            <Input placeholder="Введите email" style={{
                                marginTop: '20px',
                                width: '300px'
                            }} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
                                Оформить заказ
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                <p>Корзина пуста</p>
            )}
        </Modal>
    );
};

export default BasketModal;
