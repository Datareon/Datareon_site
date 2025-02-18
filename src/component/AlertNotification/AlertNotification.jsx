import React from 'react';
import { Alert } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

const AlertNotification = ({ alerts }) => {
    return (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '1000' }}>
            <AnimatePresence>
                {alerts.map((id) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginBottom: '10px' }}
                    >
                        <Alert message="Товар добавлен в корзину" type="success" showIcon />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default AlertNotification;
