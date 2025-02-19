import React, { useState } from 'react';
import h from './Header.module.css';
import auth from '../../img/Рисунок5.png';
import AnimatedIcons from '../AnimatedIcons/AnimatedIcons';
import Auth from '../Auth/Auth.jsx';

const Header = ({token, setToken}) => {
    const [visible, setVisible] = useState(true);


    
    return (
        <div className={h.wrapper}>
            <div className={h.text}>
                Приветствую Вас на тестовом сайте для демонстрации работы Datareon Platform!
            </div>
            <AnimatedIcons className={h.icons}/>
            <div onClick={() => setVisible(true)} className={h.authDiv}>
                <img src={auth} alt="" className={h.auth} />
            </div>
            <Auth 
                isVisible={visible}
                onClose={() => setVisible(false)}
                token={token} 
                setToken={setToken}
                />
        </div>
    );
};

export default Header;