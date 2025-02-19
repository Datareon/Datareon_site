import React, { useState } from "react";
import { Modal, message, Button, Form, Input, Alert } from "antd";

const Auth = ({ isVisible, onClose, setToken }) => {
    const [error, setError] = useState(null); // Состояние для ошибки

    const handleLogin = async (values) => {
        setError(null); // Очистка ошибки при новом запросе

        try {
            const response = await fetch("http://localhost:3444/api/session/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                body: JSON.stringify({
                    login: values.username,
                    password: values.password,
                }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setToken(data.AccessToken);
            message.success("Успешный вход!");

            onClose(); // Закрываем окно после успешного входа
        } catch (error) {
            setError("Неправильный логин или пароль!"); // Устанавливаем сообщение ошибки
            console.error("Ошибка авторизации:", error);
        }
    };

    return (
        <Modal title="Авторизация" open={isVisible} onCancel={onClose} footer={null} width="400px">
            {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 15 }} />} {/* Показываем ошибку */}
            
            <Form
                name="loginForm"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                autoComplete="off"
            >
                <Form.Item
                    label="Логин"
                    name="username"
                    rules={[{ required: true, message: "Пожалуйста, введите логин!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Auth;
