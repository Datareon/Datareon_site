import React from 'react';
import h from './Header.module.css';
import img_1 from '../../img/1541506.png';
import img_2 from '../../img/images.png';
import img_3 from '../../img/60729.png';
import img_4 from '../../img/icons8-it-50.png';
import img_5 from '../../img/Рисунок1.png';
import AnimatedIcons from '../AnimatedIcons/AnimatedIcons';

const Header = () => {
    return (
        <div className={h.wrapper}>
            <div className={h.text}>
                Приветствую Вас на тестовом сайте для демонстрации работы Datareon Platform!
            </div>
            <AnimatedIcons />
        </div>
    );
};

export default Header;