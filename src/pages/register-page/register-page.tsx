import { useCallback, useState, useEffect, SyntheticEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/use-auth";

import {
	Input,
	Button,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./register-page.module.css";
import { IRegisterRequest } from "../../api/types";

export default function RegisterPage() {
	const navigate = useNavigate();
	const { register, user, dismissErrors } = useAuth();

	const [credentials, setValue] = useState<IRegisterRequest>({
		email: "",
		password: "",
		name: "",
	});

	const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
		setValue({ ...credentials, [e.currentTarget.name]: e.currentTarget.value });
	};

	useEffect(() => {
		dismissErrors();
	}, []);
	const onRegister = useCallback(
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
			<form className={styles.form} onSubmit={onRegister}>
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
						value={credentials.password}
						name="password"
						onChange={onChange}
					/>
				</div>
				{user.error && (
					<p className={`text text_type_main-default mt-3`}>
						Ошибка регистрации!
					</p>
				)}
				<div className={`mt-6`}>
					<Button htmlType="submit">Зарегистрироваться</Button>
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
