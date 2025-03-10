import React from "react";
import { Card, Button, Modal, message, Form, Input } from "antd";
import b from "./BasketModal.module.css";
import image from "../../img/imgpsh_2.png";

const { Meta } = Card;

// Компонент BasketModal отвечает за отображение корзины и оформление заказа
const BasketModal = ({ isVisible, onClose, counts, updateCount, handleAddToCart, data, token }) => {
    //Обработчик отправки заказа
    const handleOrderSubmit = async (values) => {
        //Формирование заказа
        const orderData = {
            Заказ: Object.keys(counts)
                .filter((key) => counts[key] > 0)
                .map((key) => {
                    const item = data.find((item) => String(item.Идентификатор) === String(key));
                    return item ? {
                        Идентификатор: String(item.Идентификатор),
                        Количество: String(counts[key]),
                    } : null;
                }).filter(Boolean),
            Почта: values.email,
        };
        //Отправка POST запроса с формированным зказом
        try {
            console.log(JSON.stringify(orderData, null, 2));
            const response = await fetch("http://localhost:3444/sendJson", {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, //передача токена авторизации в заголовке запроса
                },
                body: JSON.stringify(orderData), //строка преодбразования в JSON тело сообщения и передача в теле сообщения
            });

            if (response.ok) {
                onClose(); //при успешной отправке, окно закрывается
            } else {
                console.error("Ошибка при оформлении заказа"); //при возникновении ошибки выводится сообщение в консоль браузера
            }
        } catch (error) {
            console.error("Ошибка:", error); //при неудачной попытке отправки, выводится сообщени в консоль
        }
    };

    //объект для заполнения обязательного поля
    const validateMessages = {
        required: 'Обязательное поле!',
        types: {
            email: 'Некорректный email!',
        },
    };

    return (
        // модальное окно для отображения корзины
        <Modal
            title="Корзина"
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width="700px"
        >
            {/*Отображение выбранных карточек и формы заполнения почты для отправки заказа*/}
            {Object.keys(counts).some((key) => counts[key] > 0) ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center' }}>
                    <div className={b.wrapperModal}>
                        {Object.keys(counts).map((key) => {
                            if (counts[key] > 0) {
                                const item = data.find((item) => String(item.Идентификатор) === String(key));
                                return item ? (
                                    <div key={String(item.Идентификатор)} className={b.cardsModal}>
                                        <Card hoverable style={{ width: 240 }} cover={<img alt="example" src={image} />}>
                                            <Meta title={item.Наименование} description={item.Наименование} />
                                        </Card>
                                        <div className={b.buttons}>
                                            <Button onClick={() => updateCount(String(item.Идентификатор), -1)}> - </Button>
                                            <div className={b.counter}>{counts[String(item.Идентификатор)]}</div>
                                            <Button onClick={() => handleAddToCart(String(item.Идентификатор))}> + </Button>
                                        </div>
                                    </div>
                                ) : null;
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
                            <Input placeholder="Введите email" style={{ marginTop: '20px', width: '300px' }} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
                                Оформить заказ
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                //если корзина пустая, то выводим сообщение
                <p>Корзина пуста</p>
            )}
        </Modal>
    );
};

export default BasketModal;
