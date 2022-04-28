import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const ProtectedRoute = ({ children }) => {
	let { user } = useAuth();
	let location = useLocation();

	if (!user.authenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};
export default ProtectedRoute;
