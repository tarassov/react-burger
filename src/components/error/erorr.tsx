import styles from "./error.module.css";
import { useAppSelector } from "../../services/store/store";
function Error() {
	const order = useAppSelector((store) => store.system);

	return (
		<div className={styles.container}>
			<p className={`text text_type_main-medium mt-30  ${styles.title}`}>
				{order.errorMessage}
			</p>
		</div>
	);
}

export default Error;
