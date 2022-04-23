import AppHeader from "../app-header/app-header";
import MainLayout from "../main-layout/main-layout";

import { Provider } from "react-redux";
import store from "../../services/store/store";
import styles from "./app.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../../pages/login-page/login-page";

function App() {
	return (
		<div className={styles.app}>
			<Provider store={store}>
				<AppHeader />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<MainLayout />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
