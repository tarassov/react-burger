import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";

export default function Logout() {
	const { signOut } = useAuth();
	const navigate = useNavigate();
	const onClick = () => {
		signOut().then(navigate("/", { replace: true }));
	};
	return (
		<div className={"mt-20"}>
			<Button onClick={onClick} primary={true}>
				Выйти
			</Button>
		</div>
	);
}
