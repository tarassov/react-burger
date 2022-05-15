import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useLocationTyped } from "../hooks/use-location-typed";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const { user } = useAuth();
	const location = useLocationTyped();

	if (!user.authenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};
export default ProtectedRoute;
