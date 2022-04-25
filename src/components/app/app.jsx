import { Provider } from "react-redux";
import store from "../../services/store/store";
import styles from "./app.module.css";

import MainLayout from "../main-layout/main-layout";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "../app-header/app-header";

function App() {
	return (
		<div className={styles.app}>
			<Provider store={store}>
				<BrowserRouter>
					<AppHeader />
					<MainLayout />
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
