import React from 'react';
import { Alert } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

// Компонент для отображения уведомлений об успешных действиях
const AlertNotification = ({ alerts }) => {
    return (
        // Контейнер для уведомлений, фиксированный в правом верхнем углу
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '1000' }}>
            <AnimatePresence>
                {alerts.map((id) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, y: -20 }} // Анимация появления: вылет сверху с нулевой прозрачностью
                        animate={{ opacity: 1, y: 0 }}   // Анимация вхождения: появление и опускание на своё место
                        exit={{ opacity: 0, y: -20 }}    // Анимация выхода: исчезновение и подъем вверх
                        transition={{ duration: 0.3 }}  // Длительность анимации — 0.3 секунды
                        style={{ marginBottom: '10px' }}
                    >
                        {/* Сообщение об успешном добавлении товара в корзину */}
                        <Alert message="Товар добавлен в корзину" type="success" showIcon />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default AlertNotification;
