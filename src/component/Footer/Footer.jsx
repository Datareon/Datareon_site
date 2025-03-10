import React from 'react';
import f from './Footer.module.css'; // Импорт стилей для футера
import image from '../../img/icon-logo-datarion.svg'; // Логотип компании

// Компонент футера сайта
const Footer = () => {
    return (
        <div className={f.wrapper}>
            {/* Контейнер для содержимого футера */}
            <div className={f.content}>
                {/* Логотип компании */}
                <img src={image} alt="" style={{ width: '200px' }} />

                {/* Контактные данные (телефон и email) */}
                <div className={f.tel_email}>
                    <div className={f.tel}>
                        {/* Ссылка на номер телефона с возможностью звонка */}
                        <a href="tel:+74952800801">+7 (495) 280-08-01</a>
                    </div>
                    <div className={f.email}>
                        {/* Ссылка на почту с возможностью отправить письмо */}
                        <a href="mailto:info@datareon.ru">info@datareon.ru</a>
                    </div>
                </div>

                {/* Адрес компании */}
                <div className={f.adress}>
                    <div className={f.title_adr}>
                        {/* Заголовок для адреса */}
                        Наш адрес
                    </div>
                    <div className={f.adr}>
                        {/* Ссылка на адрес с возможностью открыть его на карте */}
                        <a href="https://yandex.ru/maps/213/moscow/house/ulitsa_dokukina_16s3/Z04YcANpTEIOQFtvfXR1cH5iYQ==/?ll=37.649579%2C55.841215&utm_source=share&z=16">
                            129226, Россия,<br />
                            Москва, ул.Докукина, дом 16, строение 3
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
