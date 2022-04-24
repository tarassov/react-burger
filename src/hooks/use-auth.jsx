import { useDispatch, useSelector } from "react-redux";
import {
	login,
	logout,
	register as registerAction,
	dismissErrors as dismissErrorsAction,
} from "../services/actions/user-actions";

export function useAuth() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	const dismissErrors = () => {
		if (user.error) dispatch(dismissErrorsAction());
	};

	const signIn = async (credentials) => {
		dispatch(login(credentials));
	};

	const signOut = async () => {
		dispatch(logout());
	};
	const updateUser = async () => {
		console.log("updating user");
	};
	const register = async (credentials) => {
		dispatch(registerAction(credentials));
	};

	const checkAuth = () => {
		console.log("Checking auth");
	};

	return {
		user,
		checkAuth,
		signIn,
		signOut,
		register,
		dismissErrors,
		updateUser,
	};
}
