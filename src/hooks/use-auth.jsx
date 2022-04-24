import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../services/actions/user-actions";

export function useAuth() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	const signIn = async (credentials) => {
		console.log(credentials);
		dispatch(login(credentials));
	};

	const signOut = async () => {
		dispatch(logout());
	};

	const checkAuth = () => {
		console.log("Checking auth");
	};

	return {
		user,
		checkAuth,
		signIn,
		signOut,
	};
}
