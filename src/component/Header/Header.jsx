import React, { useState } from 'react';
import h from './Header.module.css'; // Импорт стилей для хедера
import auth from '../../img/Рисунок5.png'; // Изображение для кнопки авторизации
import AnimatedIcons from '../AnimatedIcons/AnimatedIcons'; // Анимационные иконки
import Auth from '../Auth/Auth.jsx'; // Компонент для авторизации и регистрации
import { message } from 'antd'; // Использование компонента message из Ant Design для вывода сообщений

// Компонент хедера
const Header = ({ token, setToken }) => {
    const [visible, setVisible] = useState(true); // Стейт для отображения/скрытия формы авторизации
    const [regToken, setRegToken] = useState(''); // Токен для регистрации
    const [userRole, setUserRole] = useState(''); // Роль пользователя
    const [error, setError] = useState(false); // Стейт для ошибок авторизации

    // Функция получения регистрационного токена (для регистрации новых пользователей)
    const getRegToken = async (values) => {
        try {
            const response = await fetch('https://localhost:7201/api/session/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                },
                body: JSON.stringify({
                    login: values.username, // Логин пользователя
                    password: values.password, // Пароль пользователя
                }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setRegToken(data.accessToken); // Сохранение регистрационного токена
        } catch (error) {
            console.error('Ошибка получения токена:', error); // Логирование ошибки
        }
    };

    // Функция для выполнения входа в систему
    const handleLogin = async (values) => {
        try {
            const response = await fetch('http://localhost:3444/api/session/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                },
                body: JSON.stringify({
                    login: values.username, // Логин
                    password: values.password, // Пароль
                }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setToken(data.AccessToken); // Установка токена после успешного входа
            setUserRole(values.username); // Установка роли пользователя (здесь предполагается, что роль передается через имя)
            console.log('Успешный вход!');
            getRegToken(values); // Получаем регистрационный токен
            setError(false); // Сброс ошибки
            setVisible(false); // Закрываем форму авторизации
        } catch (error) {
            setError(true); // Устанавливаем ошибку при неудачной авторизации
            console.error('Ошибка авторизации:', error);
        }
    };

    // Функция для регистрации нового пользователя
    const handleRegister = async (values) => {
        try {
            const entity = crypto.randomUUID(); // Генерация уникального ID для сущности
            const response = await fetch('https://localhost:7201/api/credential/credentialUsers/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: `Bearer ${regToken}`, // Использование регистрационного токена
                },
                body: JSON.stringify({
                    clusterId: null,
                    comment: values.comment || '', // Комментарий к пользователю
                    isEnabled: values.isEnabled || false, // Статус активности пользователя
                    entityId: entity, // Уникальный идентификатор пользователя
                    name: values.name, // Имя пользователя
                    description: values.description || '', // Описание пользователя
                    roles: [], // Роли пользователя
                    email: values.email || '', // Электронная почта пользователя
                    tagsCollection: [], // Коллекция тегов
                    version: 0, // Версия данных
                }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            setVisible(false); // Закрытие формы после успешной регистрации
        } catch (error) {
            console.error('Ошибка регистрации:', error); // Логирование ошибки
        }
    };

    // Заголовок формы авторизации зависит от роли пользователя
    const authTitle = token && userRole === 'Администратор' ? 'Добавление пользователя' : 'Вход';

    return (
        <div className={h.wrapper}>
            {/* Приветственное сообщение */}
            <div className={h.text}>
                Приветствую Вас на тестовом сайте для демонстрации работы Datareon Platform!
            </div>
            {/* Анимационные иконки */}
            <AnimatedIcons className={h.icons} />
            {/* Блок для отображения формы авторизации */}
            <div onClick={() => setVisible(true)} className={h.authDiv}>
                <img src={auth} alt="" className={h.auth} />
                {/* Текст для кнопки авторизации/регистрации */}
                <div className={h.textAuth}>{authTitle}</div>
            </div>
            {/* Компонент формы авторизации/регистрации */}
            <Auth
                isVisible={visible} // Видимость формы
                onClose={() => setVisible(false)} // Закрытие формы
                onLogin={handleLogin} // Функция для входа
                onRegister={handleRegister} // Функция для регистрации
                token={token} // Токен пользователя
                userRole={userRole} // Роль пользователя
                error={error} // Ошибка при авторизации
            />
        </div>
    );
};

export default Header;
