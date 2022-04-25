import { Provider } from "react-redux";
import store from "../../services/store/store";
import styles from "./app.module.css";

import Main from "../main-layout/main-layout";

function App() {
	return (
		<div className={styles.app}>
			<Provider store={store}>
				<Main />
			</Provider>
		</div>
	);
}

export default App;
