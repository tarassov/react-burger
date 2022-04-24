import AppHeader from "../app-header/app-header";
import { Provider } from "react-redux";
import store from "../../services/store/store";
import styles from "./app.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	LoginPage,
	ProfilePage,
	HomePage,
	OrderHistory,
	ProfileEdit,
} from "../../pages";
import RequireAuth from "../../pages/require-auth";

function App() {
	return (
		<div className={styles.app}>
			<Provider store={store}>
				<BrowserRouter>
					<AppHeader />
					<Routes>
						<Route path="/login" element={<LoginPage />} />
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
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
