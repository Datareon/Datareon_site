import React, { useState } from 'react';
import h from './Header.module.css';
import auth from '../../img/Рисунок5.png';
import AnimatedIcons from '../AnimatedIcons/AnimatedIcons';
import Auth from '../Auth/Auth.jsx';
import { message } from 'antd';

const Header = ({token, setToken}) => {
    const [visible, setVisible] = useState(true);
    const [regToken, setRegToken] = useState('');
    const [userRole, setUserRole] = useState('');
    const [error, setError] = useState(false);

    const getRegToken = async (values) => {
        try {
            const response = await fetch('https://localhost:7201/api/session/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
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
            setRegToken(data.accessToken);
        } catch (error) {
            console.error('Ошибка получения токена:', error);
        }
    };

    const handleLogin = async (values) => {
        try {
            const response = await fetch('http://localhost:3444/api/session/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
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
            setUserRole(values.username);
            console.log('Успешный вход!');
            getRegToken(values);
            setError(false);
            setVisible(false);
        } catch (error) {
            message.error('Неправильный логин или пароль!');
            setError(true);
            console.error('Ошибка авторизации:', error);
        }
    };

    const handleRegister = async (values) => {
        try {
            const entity = crypto.randomUUID();
            const response = await fetch('https://localhost:7201/api/credential/credentialUsers/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: `Bearer ${regToken}`,
                },
                body: JSON.stringify({
                    clusterId: null,
                    comment: values.comment || '',
                    isEnabled: values.isEnabled || false,
                    entityId: entity,
                    name: values.name,
                    description: values.description || '',
                    roles: [],
                    email: values.email || '',
                    tagsCollection: [],
                    version: 0,
                }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            message.success('Регистрация успешна!');
            setVisible(false);
        } catch (error) {
            message.error('Ошибка при регистрации!');
            console.error('Ошибка регистрации:', error);
        }
    };

    const authTitle = token && userRole === 'Администратор' ? 'Добавление пользователя' : 'Вход';

    return (
        <div className={h.wrapper}>
            <div className={h.text}>
                Приветствую Вас на тестовом сайте для демонстрации работы Datareon Platform!
            </div>
            <AnimatedIcons className={h.icons} />
            <div onClick={() => setVisible(true)} className={h.authDiv}>
                <img src={auth} alt="" className={h.auth} />
                <div className={h.textAuth}>{authTitle}</div>
            </div>
            <Auth
                isVisible={visible}
                onClose={() => setVisible(false)}
                onLogin={handleLogin}
                onRegister={handleRegister}
                token={token}
                userRole={userRole}
                error={error}
            />
        </div>
    );
};

export default Header;