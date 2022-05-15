import { useNavigate } from "react-router-dom";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./not-found-page.module.css";
import img404 from "../../images/404.png";

export default function NotFoundPage() {
	const navigate = useNavigate();

	const back = () => {
		navigate(-1);
	};
	return (
		<div className={`${styles.container}`}>
			<div className={`mb-10`}>
				<p className={`text text_type_main-large`}>
					Эта посадочная площадка номер 404 пока пустует
				</p>
			</div>
			<div className={`mb-10`}>
				<Button type="primary" onClick={back}>
					Летим обратно
				</Button>
			</div>
			<img src={img404} className={styles.image} alt="изображение недоступно" />
		</div>
	);
}
