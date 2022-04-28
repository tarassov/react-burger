import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import {
	Input,
	Button,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./reset-password-page.module.css";
import { setPassword } from "../../services/actions/user-actions";
import { useDispatch } from "react-redux";

export default function ResetPasswordPage() {
	const dispatch = useDispatch();

	const [values, setValues] = useState({ token: "", password: "" });
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const send = useCallback(
		(e) => {
			e.preventDefault();
			setError(false);
			setErrorMessage("");
			dispatch(setPassword(values)).then((res) => {
				if (res.error) {
					setError(true);
					setErrorMessage("Неверный код");
				}
			});
		},
		[setPassword, values, dispatch]
	);

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={send}>
				<div>
					<p className={`text text_type_main-default`}>Восстановление пароля</p>
				</div>

				<div className={`mt-6`}>
					<PasswordInput
						placeholder="Введите новый пароль"
						name="password"
						onChange={onChange}
						value={values.password}
					/>
				</div>

				<div className={`mt-6`}>
					<Input
						placeholder="Введите код из письма"
						name="token"
						onChange={onChange}
						errorText={errorMessage}
						error={error}
						value={values.token}
					/>
				</div>
				<div className={`mt-6`}>
					<Button htmlType="submit" primary={true}>
						Сохранить
					</Button>
				</div>
			</form>
			<div className={`mt-20`}>
				<p className={`text text_type_main-default text_color_inactive`}>
					Вспомнили пароль?{" "}
					<Link to="/login">
						<Button type="secondary"> Войти</Button>
					</Link>
				</p>
			</div>
		</div>
	);
}
