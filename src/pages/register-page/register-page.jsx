import { useCallback, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/use-auth";

import {
	Input,
	Button,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register-page.module.css";

export default function RegisterPage() {
	const navigate = useNavigate();
	const { register, user, dismissErrors } = useAuth();

	const [credentials, setValue] = useState({
		email: "",
		password: "",
		name: "",
	});

	const onChange = (e) => {
		setValue({ ...credentials, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		dismissErrors();
	}, []);
	const onClick = useCallback(
		(e) => {
			e.preventDefault();
			register(credentials);
		},
		[register, navigate, credentials]
	);

	if (user.authenticated) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<div>
					<p className={`text text_type_main-large`}>Регистрация</p>
				</div>
				<div className={`mt-6`}>
					<Input
						placeholder="Имя"
						value={credentials.name}
						name="name"
						onChange={onChange}
					/>
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
					<Button onClick={onClick} primary={true}>
						Зарегистрироваться
					</Button>
				</div>
			</form>
			<div className={`mt-20`}>
				<p className={`text text_type_main-default text_color_inactive`}>
					Уже зарегистрированы?{" "}
					<Link to="/login">
						<Button type={"secondary"}>Войти</Button>
					</Link>
				</p>
			</div>
		</div>
	);
}
