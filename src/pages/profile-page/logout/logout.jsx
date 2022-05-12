import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";

export default function Logout() {
	const { signOut } = useAuth();
	const navigate = useNavigate();
	const onClick = () => {
		signOut();
	};
	const back = () => {
		navigate(-1);
	};
	return (
		<div className={"mt-20"}>
			<div className={"mb-8"}>
				<p className={`text text_type_main-large`}>Покинуть планету?</p>
			</div>
			<Button onClick={onClick} primary={true}>
				Да
			</Button>
			<Button onClick={back} type={"secondary"}>
				Нет
			</Button>
		</div>
	);
}
