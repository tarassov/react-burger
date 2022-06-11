import React, { useEffect, FC } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import { closeModal } from "../../services/actions/system-actions";
import { useAppDispatch } from "../../services/store/store";

const modalRoot = document.getElementById("modal-root");

const Modal: FC<{ onClose?: () => void }> = ({ children, onClose }) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		window.addEventListener("keydown", keyHandler);
		return () => {
			window.removeEventListener("keydown", keyHandler);
		};
	}, []);

	const close = () => {
		dispatch(closeModal());
		if (onClose) onClose();
	};

	const keyHandler = (e: KeyboardEvent) => {
		e.preventDefault();
		if (e.key === "Escape") {
			close();
		}
	};

	return modalRoot
		? ReactDOM.createPortal(
				<>
					<ModalOverlay onClick={close} />
					<div className={styles.modal}>
						<div
							className={styles.closeButton}
							onClick={close}
							data-test-id="modal-close-button"
						>
							<CloseIcon type="primary" />
						</div>
						<div>{children}</div>
					</div>
				</>,
				modalRoot
		  )
		: null;
};

export default Modal;
