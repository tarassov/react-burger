import styles from "./error.module.css";
import { useSelector } from "react-redux";

function Error() {
	const order = useSelector((store) => store.system);

	return (
		<div className={styles.container}>
			<p className={`text text_type_main-medium mt-30  ${styles.title}`}>
				{order.errorMessage}
			</p>
		</div>
	);
}

export default Error;
