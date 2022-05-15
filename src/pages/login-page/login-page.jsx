import React, { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/use-auth";

import {
	Input,
	Button,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./login-page.module.css";
import { useLocationTyped } from "../../hooks/use-location-typed";

export default function LoginPage() {
	const navigate = useNavigate();
	const { signIn, user, dismissErrors } = useAuth();
	const location = useLocationTyped();

	const from =
		location.state?.from?.pathname !== "/profile/logout"
			? location.state?.from?.pathname || "/"
			: "/";

	const [credentials, setValue] = useState({ email: "", password: "" });

	useEffect(() => {
		dismissErrors();
	}, []);

	const onChange = (e) => {
		setValue({ ...credentials, [e.target.name]: e.target.value });
	};

	let login = useCallback(
		(e) => {
			e.preventDefault();
			signIn(credentials);
		},
		[signIn, navigate, credentials]
	);

	if (user.authenticated) {
		return <Navigate to={from} />;
	}

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={login}>
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
				{user.error && (
					<p className={`text text_type_main-default mt-3`}>
						Ошибка авторизации!
					</p>
				)}
				<div className={`mt-6`}>
					<Button htmlType="submit" primary={true}>
						Войти
					</Button>
				</div>
			</form>
			<div className={`mt-20`}>
				<p className={`text text_type_main-default text_color_inactive`}>
					Вы - новый пользователь?{" "}
					<Link to="/register">
						{" "}
						<Button type={"secondary"}>Зарегистрироваться</Button>
					</Link>
				</p>
			</div>
			<div className={`mt-4`}>
				<p className={`text text_type_main-default text_color_inactive`}>
					Забыли пароль?{" "}
					<Link to="/forgot-password">
						<Button type={"secondary"}>Восстановить пароль</Button>
					</Link>
				</p>
			</div>
		</div>
	);
}
