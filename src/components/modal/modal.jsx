import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const modalRoot = document.getElementById("modal-root");


export default function Modal ({open, children, onClose}) {
        const [isOpen, setIsOpen] = useState(false)

        useEffect(()=>{
            setIsOpen(open)
        },[open])

        useEffect(()=>{
            if (isOpen) window.addEventListener("keydown", keyHandler);
            return () => {
                window.removeEventListener("keydown", keyHandler);
            };
        },[isOpen])

        const close = ()=> {
           setIsOpen(false)
           onClose()
        }

        const keyHandler = (e) => {
            e.preventDefault()
            if (isOpen && e.which ==27){
                close()
            }
        }

        return ReactDOM.createPortal(
           <>
           {isOpen && 
             <>
                <ModalOverlay onClick={close}/>
                <div className={styles.modal}>     
                    <div className={styles.closeButton} onClick={close}>
                        <CloseIcon type="primary" />
                    </div> 
                    <div>
                        {children}
                    </div>       
                </div>
              </>
            }
          </> 
          ,modalRoot
        );

} 

