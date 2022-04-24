import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const RequireAuth = ({ children }) => {
	let { user } = useAuth();
	let location = useLocation();

	if (!user.loggedIn) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};
export default RequireAuth;
