import AppHeader from "../app-header/app-header";
import MainLayout from "../main-layout/main-layout";

import { Provider } from "react-redux";
import store from "../../services/store/store";

function App() {
	return (
		<div style={{ overflow: "hidden" }}>
			<Provider store={store}>
				<AppHeader />
				<MainLayout />
			</Provider>
		</div>
	);
}

export default App;
