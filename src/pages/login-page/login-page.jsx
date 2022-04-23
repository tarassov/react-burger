import React, { useCallback, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuth } from "../../hooks/use-auth";

import {
	Input,
	Button,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./login-page.module.css";

export function LoginPage() {
	const navigate = useNavigate();
	const auth = useAuth();

	const from = location.state?.from?.pathname || "/";
	const { loggedIn } = useSelector((store) => store.user);

	const [credentials, setValue] = useState({ email: "", password: "" });

	const onChange = (e) => {
		setValue({ ...credentials, [e.target.name]: e.target.value });
	};

	let login = useCallback(
		(e) => {
			e.preventDefault();
			auth.signIn(credentials).then(navigate(from, { replace: true }));
		},
		[auth, navigate, credentials]
	);

	if (loggedIn) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<div>
					<p className={`text text_type_main-large`}>Вход</p>
				</div>

				<div className={`mt-6`}>
					<Input
						placeholder="Email"
						value={credentials.email}
						name="email"
						onChange={onChange}
					/>
				</div>
				<div className={`mt-6`}>
					<PasswordInput
						placeholder="Password"
						value={credentials.password}
						name="password"
						onChange={onChange}
					/>
				</div>
				<div className={`mt-6`}>
					<Button onClick={login} primary={true}>
						Войти
					</Button>
				</div>
			</form>
			<div className={`mt-20`}>
				<p className={`text text_type_main-default text_color_inactive`}>
					Вы - новый пользователь?{" "}
					<Link className={styles.link} to="/register">
						Зарегистрироваться
					</Link>
				</p>
			</div>
			<div className={`mt-4`}>
				<p className={`text text_type_main-default text_color_inactive`}>
					Забыли пароль?{" "}
					<Link className={styles.link} to="/forgot-password">
						Восстановить пароль
					</Link>
				</p>
			</div>
		</div>
	);
}