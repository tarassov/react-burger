import React, { useState } from "react";

import {
	Input,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile-edit.module.css";

export default function ProfileEdit() {
	const [form, setValue] = useState({ name: "", email: "", password: "" });

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<div className={`mt-6`}>
					<Input
						placeholder="Имя"
						value={form.email}
						name="name"
						onChange={onChange}
					/>
				</div>
				<div className={`mt-6`}>
					<Input
						placeholder="Логин"
						value={form.email}
						name="email"
						onChange={onChange}
					/>
				</div>
				<div className={`mt-6`}>
					<PasswordInput
						placeholder="Password"
						value={form.password}
						name="password"
						onChange={onChange}
					/>
				</div>
			</form>
		</div>
	);
}
