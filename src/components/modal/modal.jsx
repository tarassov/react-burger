import React, { useEffect} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const modalRoot = document.getElementById("modal-root");


export default function Modal({ children, onClose }) {
    useEffect(() => {
        window.addEventListener("keydown", keyHandler);
        return () => {
            window.removeEventListener("keydown", keyHandler);
        };
    }, [])

    const close = () => {
        onClose()
    }

    const keyHandler = (e) => {
        e.preventDefault()
        if (e.key === "Escape") {
            close()
        }
    }

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={close} />
            <div className={styles.modal}>
                <div className={styles.closeButton} onClick={close}>
                    <CloseIcon type="primary" />
                </div>
                <div>
                    {children}
                </div>
            </div>
        </>
        , modalRoot
    );

}

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired
}