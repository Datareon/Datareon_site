import React from 'react';
import { Modal, Form, Input, Button, Alert, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// Компонент Auth отвечает за авторизацию и добавление пользователей
const Auth = ({ isVisible, onClose, onLogin, onRegister, token, userRole, error }) => {
    return (
        // Модальное окно, отображаемое в зависимости от наличия токена
        <Modal title={token ? 'Добавление пользователя' : 'Авторизация'} open={isVisible} onCancel={onClose} footer={null} width="400px">
            {token && userRole === 'Администратор' ? (
                // Форма для добавления нового пользователя (доступна только администратору)
                <Form name="registerForm" layout="vertical" onFinish={onRegister} autoComplete="off">
                    <Form.Item label="Полное имя" name="description" rules={[{ required: true, message: 'Пожалуйста, введите Полное имя!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="isEnabled" valuePropName="checked">
                        <Checkbox>Активен</Checkbox>
                    </Form.Item>
                    <Form.Item label="E-mail" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Комментарий" name="comment">
                        <Input />
                    </Form.Item>
                    {/* Уведомление о том, что пароль и роли задаются в Центре мониторинга */}
                    <Alert style={{ textAlign: "center" }} message="Пароль и роли пользователя задаются в Центре мониторинга, после его создания" type="warning" />
                    <br />
                    <Button type="primary" htmlType="submit" block>
                        Создать
                    </Button>
                </Form>
            ) : (
                // Форма для авторизации пользователя
                <Form name="loginForm" layout="vertical" onFinish={onLogin} autoComplete="off">
                    <Form.Item label="Логин" name="username" rules={[{ required: true, message: 'Введите логин!' }]}> 
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль!' }]}> 
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    {/* Отображение ошибки авторизации, если она есть */}
                    {error ? (
                        <Alert message="Неправильный логин или пароль!" type="error" style={{ marginBottom: "10px" }} />
                    ) : (
                        <div></div>
                    )}
                    <Button type="primary" htmlType="submit" block>
                        Войти
                    </Button>
                </Form>
            )}
        </Modal>
    );
};

export default Auth;
