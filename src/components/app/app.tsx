import { Provider } from "react-redux";
import { store, history } from "../../services/store/store";
import styles from "./app.module.css";

import SwitchRoutes from "../switch-routes/switch-routes";

import { HistoryRouter as Router } from "redux-first-history/rr6";
import AppHeader from "../app-header/app-header";

function App() {
	return (
		<div className={styles.app}>
			<Provider store={store}>
				<Router history={history}>
					<AppHeader />
					<SwitchRoutes />
				</Router>
			</Provider>
		</div>
	);
}

export default App;
