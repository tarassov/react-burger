import { Outlet } from "react-router-dom";
import NavigationLink from "../../components/navigation-link/navigation-link";

import styles from "./profile-page.module.css";

export default function ProfilePage() {
	return (
		<div className={styles.container}>
			<nav className={styles.links}>
				<NavigationLink medium to={""} text={"Профиль"} />
				<NavigationLink medium to={"orders"} text={"История заказов"} />
				<NavigationLink medium to={""} text={"Выйти"} />
			</nav>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
