import React, { useState } from "react";
import { Modal, message, Button, Form, Input, Alert, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Auth = ({ isVisible, onClose, setToken, token }) => {
    const [error, setError] = useState(null);
    const [regToken, setRegToken]= useState("");
    const [premKey, setPremKey]= useState("");
    const [userRole, setUserRole] = useState("");

    const getRegToken = async (values) => {
        try {
            // const login = encodeURIComponent(values.username); // Кодируем логин
            // const password = encodeURIComponent(values.password);
    
            const response = await fetch(`https://localhost:7201/api/session/token`, {
                method: "POST", // Важно! В Swagger явно указан POST
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
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
            console.log("Токен:", data);
            setRegToken(data.accessToken);
        } catch (error) {
            console.error("Ошибка получения токена:", error);
        }
    };
    

    const handleLogin = async (values) => {
        setError(null);

        try {
            const response = await fetch("http://localhost:3444/api/session/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
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
            getRegToken(values);
            setUserRole(values.username);
            console.log(userRole);
            onClose();
        } catch (error) {
            setError("Неправильный логин или пароль!");
            console.error("Ошибка авторизации:", error);
        }
    };

    const handleRegister = async (values) => {
        try {
            const entity = crypto.randomUUID();
            const response = await fetch("https://localhost:7201/api/credential/credentialUsers/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${regToken}`,
                },
                body: JSON.stringify({
                    clusterId: null,
                    comment: values.comment || "",
                    isEnabled: values.isEnabled || false, // Убедимся, что передается булево значение
                    entityId: entity, // Генерация GUID
                    name: values.name,
                    description: values.description || "",
                    roles: [], // Исправлено на `description`
                    email: values.email || "",
                    tagsCollection:[],
                    version:0,
                }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            message.success("Регистрация успешна!");
            onClose();
        } catch (error) {
            message.error("Ошибка при регистрации!");
            console.error("Ошибка регистрации:", error);
        }
    };

    return (
        <Modal title={token ? "Добавление пользователя" : "Авторизация"} open={isVisible} onCancel={onClose} footer={null} width="400px">
            {token && userRole === "Администратор" ? (
                <Form
                    name="registerForm"
                    layout="vertical"
                    initialValues={{ isEnabled: true }}
                    onFinish={handleRegister}
                    autoComplete="off"
                >
                    <Form.Item label="Полное имя" name="description" rules={[{ required: true, message: "Пожалуйста, введите Полное имя!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Имя" name="name" rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="isEnabled" valuePropName="checked">
                        <Checkbox>Активен</Checkbox>
                    </Form.Item>

                    <Form.Item label="E-mail" name="email">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Комментарий" name="comment"> {/* Исправлено на `description` */}
                        <Input />
                    </Form.Item>

                    <Alert style={{
                        textAlign:"center"
                    }}
                    message="Пароль и роли пользователя задются в Центре мониторинга, после его создания" type="warning" />
                    <br />
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <>
                    {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 15 }} />}
                    <Form name="loginForm" layout="vertical" onFinish={handleLogin} autoComplete="off">
                        <Form.Item
                            label="Логин"
                            name="username"
                            rules={[{ required: true, message: "Введите логин!" }]}
                        >
                            <Input prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={[{ required: true, message: "Введите пароль!" }]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </Modal>
    );
};

export default Auth;
