import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile-edit.module.css";
import { useAuth } from "../../../hooks/use-auth";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export default function ProfileEdit() {
	const { user, updateUser } = useAuth();
	const [values, setValues] = useState({
		email: "",
		name: "",
	});
	const [changed, setChanged] = useState(false);

	useEffect(() => {
		setValues({ ...user });
	}, []);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		setChanged(true);
	};

	let save = useCallback(
		(e) => {
			e.preventDefault();
			updateUser(values);
		},
		[updateUser, values]
	);

	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<div className={`mt-6`}>
					<Input
						placeholder="Имя"
						value={values.name}
						name="name"
						icon="EditIcon"
						onChange={onChange}
					/>
				</div>
				<div className={`mt-6`}>
					<Input
						placeholder="Логин"
						value={values.email}
						name="email"
						onChange={onChange}
						icon="EditIcon"
					/>
				</div>
				<div className={`mt-6`}>
					<Input
						placeholder="Password"
						value={"123456"}
						name="password"
						disabled
						type="password"
					/>
				</div>
				{changed && (
					<div className={`mt-6`}>
						<Button onClick={save} primary={true}>
							Сохранить
						</Button>
					</div>
				)}
			</form>
		</div>
	);
}
