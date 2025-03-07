import React from 'react';
import { Modal, Form, Input, Button, Alert, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const Auth = ({ isVisible, onClose, onLogin, onRegister, token, userRole, error }) => {
    return (
        <Modal title={token ? 'Добавление пользователя' : 'Авторизация'} open={isVisible} onCancel={onClose} footer={null} width="400px">
            {token && userRole === 'Администратор' ? (
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
                    <Alert style={{
                        textAlign:"center"
                    }}
                    message="Пароль и роли пользователя задются в Центре мониторинга, после его создания" type="warning" />
                    <br />
                    <Button type="primary" htmlType="submit" block>
                        Создать
                    </Button>
                </Form>
            ) : (
                <Form name="loginForm" layout="vertical" onFinish={onLogin} autoComplete="off">
                    <Form.Item label="Логин" name="username" rules={[{ required: true, message: 'Введите логин!' }]}> 
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль!' }]}> 
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    {error?(
                        <Alert message="Неправильный логин или пароль!" type="error" style={{
                            marginBottom:"10px"
                        }}/>
                    ):(
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
