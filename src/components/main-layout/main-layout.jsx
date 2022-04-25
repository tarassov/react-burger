import AppHeader from "../app-header/app-header";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	LoginPage,
	ProfilePage,
	HomePage,
	OrderHistory,
	ProfileEdit,
	RegisterPage,
	Logout,
} from "../../pages";
import RequireAuth from "../../pages/require-auth";
import { useAuth } from "../../hooks/use-auth";
import { useEffect } from "react";

function MainLayout() {
	const { checkAuth } = useAuth();
	useEffect(() => {
		checkAuth();
	}, []);
	return (
		<BrowserRouter>
			<AppHeader />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
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
		</BrowserRouter>
	);
}

export default MainLayout;
