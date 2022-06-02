import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile-edit.module.css";
import { useAuth } from "../../../hooks/use-auth";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { get, update } from "../../../services/actions/user-actions";
import Loader from "../../../components/loader/loader";
import { IRequest, IUserResponse } from "../../../api/types";

export default function ProfileEdit() {
	const { user, secureDispatch } = useAuth();
	const [values, setValues] = useState<{ email: string; name: string }>({
		email: "",
		name: "",
	});
	const [changed, setChanged] = useState<boolean | undefined>(false);

	useEffect(() => {
		if (!user.userLoaded) secureDispatch<IRequest, IUserResponse>(get, {});
	}, []);

	useEffect(() => {
		setValues({ email: user.email, name: user.name });
	}, [user.email, user.name]);

	const onChange = useCallback(
		(e: SyntheticEvent<HTMLInputElement>) => {
			setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
			setChanged(true);
		},
		[values]
	);

	const save = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();
			secureDispatch(update, { user: values });
			setChanged(false);
		},
		[secureDispatch, update, values]
	);
	const cancel = useCallback(
		(e) => {
			e.preventDefault();
			setValues({ email: user.email, name: user.name });
			setChanged(false);
		},
		[user.email, user.name]
	);

	if (!user.userLoaded) {
		return <Loader />;
	}
	return (
		<div className={`mt-20`}>
			<form onSubmit={save} onReset={cancel}>
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
						onChange={onChange}
						type="password"
					/>
				</div>
				{changed && (
					<div className={`${styles.button} mt-6`}>
						<Button htmlType="submit" type={"primary"}>
							Сохранить
						</Button>
						<Button htmlType="reset" type={"secondary"}>
							Отменить
						</Button>
					</div>
				)}
			</form>
		</div>
	);
}
