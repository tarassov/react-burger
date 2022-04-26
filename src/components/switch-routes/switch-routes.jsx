import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
	LoginPage,
	ProfilePage,
	HomePage,
	OrderHistory,
	ProfileEdit,
	RegisterPage,
	Logout,
	ForgotPasswordPage,
} from "../../pages";
import RequireAuth from "../../pages/require-auth";
import { useAuth } from "../../hooks/use-auth";
import { useCallback, useEffect } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Loader from "../loader/loader";

function SwitchRoutes() {
	const { checkAuth, user } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const background = location.state && location.state.background;

	const modalClose = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	useEffect(() => {
		checkAuth();
	}, []);

	if (user.pendingAuthentication) {
		return <Loader />;
	}
	return (
		<>
			<Routes location={background || location}>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/ingredients/:id" element={<IngredientDetails />} />
				<Route
					path="/"
					element={
						<RequireAuth>
							<HomePage />
						</RequireAuth>
					}
				/>
				<Route
					path="/profile"
					element={
						<RequireAuth>
							<ProfilePage />
						</RequireAuth>
					}
				>
					<Route path="" element={<ProfileEdit />} />
					<Route path="orders" element={<OrderHistory />} />
					<Route path="logout" element={<Logout />} />
				</Route>
			</Routes>
			{/* Show the modal when a `backgroundLocation` is set */}
			{background && (
				<Routes>
					<Route
						path="/ingredients/:id"
						element={
							<Modal onClose={modalClose}>
								<IngredientDetails modal />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
}

export default SwitchRoutes;
