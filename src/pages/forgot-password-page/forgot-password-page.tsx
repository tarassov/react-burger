import { FC, SyntheticEvent, useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
	Input,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./forgot-password-page.module.css";
import { forgotPassword } from "../../services/actions/user-actions";
import { useAppDispatch } from "../../services/store/store";

const ForgotPasswordPage: FC = () => {
	const [email, setEmail] = useState<string>("");
	const dispatch = useAppDispatch();
	const location = useLocation();

	const onChange = (e: SyntheticEvent) => {
		const target = e.target as HTMLInputElement;
		setEmail(target.value);
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
					<Button htmlType="submit" type="primary">
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
};

export default ForgotPasswordPage;
