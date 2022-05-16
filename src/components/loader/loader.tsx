import ReactDOM from "react-dom";
//import loader from "../../images/loader.png";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./loader.module.css";
import Spinner from "../spinner/spinner";

const modalRoot = document.getElementById("modal-root");

export default function Loader() {
	return modalRoot
		? ReactDOM.createPortal(
				<>
					<ModalOverlay onClick={close} />
					<div className={styles.modal}>
						<Spinner />
					</div>
				</>,
				modalRoot
		  )
		: null;
}
