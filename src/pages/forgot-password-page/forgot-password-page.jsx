import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import {
	Input,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./forgot-password-page.module.css";
import { forgotPassword } from "../../services/actions/user-actions";
import { useDispatch } from "react-redux";
import { useLocationTyped } from "../../hooks/use-location-typed";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const location = useLocationTyped();

	const onChange = (e) => {
		setEmail(e.target.value);
	};

	const send = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(forgotPassword({ email, location }));
		},
		[forgotPassword, email]
	);
	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={send}>
				<div>
					<p className={`text text_type_main-default`}>Восстановление пароля</p>
				</div>

				<div className={`mt-6`}>
					<Input
						placeholder="Укажите e-mail"
						name="email"
						value={email}
						onChange={onChange}
						size="default"
					/>
				</div>
				<div className={`mt-6`}>
					<Button htmlType="submit" primary={true}>
						Восстановить
					</Button>
				</div>
			</form>
			<div className={`mt-20`}>
				<p className={`text text_type_main-default text_color_inactive`}>
					Вспомнили пароль?{" "}
					<Link to="/login">
						<Button type="secondary">Войти</Button>
					</Link>
				</p>
			</div>
		</div>
	);
}
