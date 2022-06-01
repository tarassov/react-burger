import { Routes, Route, useNavigate } from "react-router-dom";
import {
	LoginPage,
	ProfilePage,
	HomePage,
	OrderHistory,
	ProfileEdit,
	RegisterPage,
	Logout,
	ForgotPasswordPage,
	ResetPasswordPage,
} from "../../pages";
import ProtectedRoute from "../../pages/protected-route";
import { useAuth } from "../../hooks/use-auth";
import { useCallback, useEffect } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Loader from "../loader/loader";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import { useLocationTyped } from "../../hooks/use-location-typed";
import FeedPage from "../../pages/feed-page/feed-page";
import OrderCard from "../order-card/order-card";

function SwitchRoutes() {
	const { checkAuth, user } = useAuth();
	const location = useLocationTyped();
	const navigate = useNavigate();

	const background = location.state && location.state.background;
	const from = location.state?.from?.pathname || "/";

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
				{from === "/forgot-password" && (
					<Route path="/reset-password" element={<ResetPasswordPage />} />
				)}
				<Route path="orders" element={<OrderHistory />} />
				<Route path="feed" element={<FeedPage />} />
				<Route path="/ingredients/:id" element={<IngredientDetails />} />
				<Route path="/feed/:number" element={<OrderCard />} />
				<Route path="/profile/orders/:number" element={<OrderCard />} />
				<Route path="/" element={<HomePage />} />
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				>
					<Route path="" element={<ProfileEdit />} />
					<Route path="orders" element={<OrderHistory />} />
					<Route path="logout" element={<Logout />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
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
					<Route
						path="/feed/:number"
						element={
							<Modal onClose={modalClose}>
								<OrderCard modal />
							</Modal>
						}
					/>
					<Route
						path="profile/orders/:number"
						element={
							<Modal onClose={modalClose}>
								<OrderCard modal />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
}

export default SwitchRoutes;
