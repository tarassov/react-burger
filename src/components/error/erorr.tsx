import styles from "./error.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store/store";
function Error() {
	const order = useSelector((store: RootState) => store.system);

	return (
		<div className={styles.container}>
			<p className={`text text_type_main-medium mt-30  ${styles.title}`}>
				{order.errorMessage}
			</p>
		</div>
	);
}

export default Error;
