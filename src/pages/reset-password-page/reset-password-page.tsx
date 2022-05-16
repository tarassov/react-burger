import { SyntheticEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import {
	Input,
	Button,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./reset-password-page.module.css";
import { setPassword } from "../../services/actions/user-actions";
import { IPasswordSetRequest } from "../../api/types";
import { useAppDispatch } from "../../services/store/store";
import { unwrapResult } from "@reduxjs/toolkit";

export default function ResetPasswordPage() {
	const dispatch = useAppDispatch();

	const [values, setValues] = useState<IPasswordSetRequest>({
		token: "",
		password: "",
	});
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
	};

	const send = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();
			setError(false);
			setErrorMessage("");
			dispatch(setPassword(values))
				.then(unwrapResult)
				.catch(() => {
					setError(true);
					setErrorMessage("Неверный код");
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
					<Button htmlType="submit">Сохранить</Button>
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
