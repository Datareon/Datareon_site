import React from 'react';
import f from './Footer.module.css'
import image from '../../img/icon-logo-datarion.svg'

const Footer = () => {
    return (
        <div className={f.wrapper}>
            <div className={f.content}>
                <img src={image} alt=""  style={{
                    width:'200px'
                }}/>
                <div className={f.tel_email}>
                    <div className={f.tel}>
                        <a href="tel:+74952800801">+7 (495) 280-08-01</a>
                    </div>
                    <div className={f.email}>
                        <a href="mailto:info@datareon.ru">info@datareon.ru</a>
                    </div>
                </div>
                <div className={f.adress}>
                    <div className={f.title_adr}>
                        Наш адрес
                    </div>
                    <div className={f.adr}>
                        <a href="https://yandex.ru/maps/213/moscow/house/ulitsa_dokukina_16s3/Z04YcANpTEIOQFtvfXR1cH5iYQ==/?ll=37.649579%2C55.841215&utm_source=share&z=16">129226, Россия,<br />
                        Москва, ул.Докукина, дом 16, строение 3</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;