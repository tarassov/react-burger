import { Link } from "react-router-dom";
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Navigation from "../navigation/navigation";
import styles from "./app-header.module.css";
import NavigationLink from "../navigation-link/navigation-link";

export default function AppHeader() {
	return (
		<header className={styles.container}>
			<Navigation className={styles.left}>
				{" "}
				<NavigationLink
					text={"Конструктор"}
					logo={<BurgerIcon type="primary" />}
					to={"/"}
					matching
					exactMatching
				/>
				<NavigationLink
					text={"Лента заказов"}
					logo={<ListIcon type="primary" />}
					to={"/feed"}
					matching
				/>
			</Navigation>

			<div className={styles.logo}>
				<Link to="/">
					<Logo />
				</Link>
			</div>

			<Navigation className={styles.right}>
				{" "}
				<NavigationLink
					text={"Личный кабинет"}
					to={"profile"}
					logo={<ProfileIcon type="primary" />}
					matching
				/>
			</Navigation>
		</header>
	);
}
