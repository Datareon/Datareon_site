import React from 'react';
import img_1 from '../../img/1541506.png';
import img_2 from '../../img/images.png';
import img_3 from '../../img/60729.png';
import img_4 from '../../img/icons8-it-50.png';
import img_5 from '../../img/Рисунок1.png';
import img_6 from '../../img/Рисунок2.png';
import img_7 from '../../img/Рисунок3.png';
import img_8 from '../../img/Рисунок4.png';
import a from './AnimatedIcons.module.css';

const AnimatedIcons = () => {
    return (
        <div className={a.icons}>
            <img src={img_1} alt="" className={a.img_1}/>
            <img src={img_2} alt="" className={a.img_2}/>
            <img src={img_3} alt="" className={a.img_3}/>
            <img src={img_4} alt="" className={a.img_4}/>
            <img src={img_5} alt="" className={a.img_5}/>
            <img src={img_6} alt="" className={a.img_6}/>
            <img src={img_7} alt="" className={a.img_7}/>
            <img src={img_8} alt="" className={a.img_8}/>
        </div>
    );
};

export default AnimatedIcons;