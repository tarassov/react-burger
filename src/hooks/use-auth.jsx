import { useDispatch } from "react-redux";
import { login, logout } from "../services/actions/user-actions";

export function useAuth() {
	const dispatch = useDispatch();

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
		checkAuth,
		signIn,
		signOut,
	};
}
