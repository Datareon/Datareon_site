// CardModal.jsx (компонент модального окна для карточки)
import React from "react";
import { Modal } from "antd";
import image from "../../img/imgpsh_2.png";

const CardModal = ({ isVisible, onClose, card }) => {
    if (!card) return null;

    return (
        <Modal title={card.Наименование} open={isVisible} onCancel={onClose} footer={null}>
            <img src={image} alt={card.Наименование} style={{ width: "100%" }} />
            <p>{card.Наименование}</p>
            <p>description</p>
        </Modal>
    );
};

export default CardModal;
