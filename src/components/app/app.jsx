import { Provider } from "react-redux";
import { store, history } from "../../services/store/store";
import styles from "./app.module.css";

import MainLayout from "../main-layout/main-layout";

import { HistoryRouter as Router } from "redux-first-history/rr6";
import AppHeader from "../app-header/app-header";

function App() {
	return (
		<div className={styles.app}>
			<Provider store={store}>
				<Router history={history}>
					<AppHeader />
					<MainLayout />
				</Router>
			</Provider>
		</div>
	);
}

export default App;
