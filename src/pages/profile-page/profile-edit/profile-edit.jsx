import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile-edit.module.css";
import { useAuth } from "../../../hooks/use-auth";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { get, update } from "../../../services/actions/user-actions";
import Loader from "../../../components/loader/loader";

export default function ProfileEdit() {
	const { user, secureDispatch } = useAuth();
	const [values, setValues] = useState({
		email: "",
		name: "",
	});
	const [changed, setChanged] = useState(false);

	useEffect(() => {
		if (!user.userLoaded) secureDispatch(get, {});
	}, []);

	useEffect(() => {
		setValues({ email: user.email, name: user.name });
	}, [user.email, user.name]);

	const onChange = useCallback(
		(e) => {
			setValues({ ...values, [e.target.name]: e.target.value });
			setChanged(true);
		},
		[values]
	);

	let save = useCallback(
		(e) => {
			e.preventDefault();
			secureDispatch(update, { user: values });
			setChanged(false);
		},
		[secureDispatch, update, values]
	);
	if (!user.userLoaded) {
		return <Loader />;
	}
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
