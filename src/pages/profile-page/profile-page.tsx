import { Outlet } from "react-router-dom";
import NavigationLink from "../../components/navigation-link/navigation-link";

import styles from "./profile-page.module.css";

export default function ProfilePage() {
	return (
		<div className={`${styles.container} ml-20 mt-2`}>
			<nav className={`${styles.links} mt-20`}>
				<NavigationLink
					medium
					matching
					to={""}
					exactMatching
					text={"Профиль"}
				/>
				<NavigationLink
					medium
					matching
					to={"orders"}
					text={"История заказов"}
				/>
				<NavigationLink medium matching to={"logout"} text={"Выйти"} />

				<div className={`mt-4`}>
					<p className={`text text_type_main-default text_color_inactive`}>
						В этом разделе вы можете изменить свои персональные данные
					</p>
				</div>
			</nav>
			<div className={`ml-15 ${styles.outlet}`}>
				<Outlet />
			</div>
		</div>
	);
}
