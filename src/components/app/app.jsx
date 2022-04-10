import AppHeader from "../app-header/app-header";
import MainLayout from "../main-layout/main-layout";

import { Provider } from "react-redux";
import store from "../../services/store/store";
import styles from "./app.module.css";

function App() {
	return (
		<div className={styles.app}>
			<Provider store={store}>
				<AppHeader />
				<MainLayout />
			</Provider>
		</div>
	);
}

export default App;
