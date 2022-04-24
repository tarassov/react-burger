import React from "react";
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Navigation from "../navigation/navigation";
import styles from "./app-header.module.css";
import NavigationLink from "../navigation-link/navigation-link";
import { useAuth } from "../../hooks/use-auth";

export default function AppHeader() {
	const { user } = useAuth();
	return (
		<header className={styles.container}>
			<Navigation className={styles.left}>
				{user.authenticated && (
					<>
						{" "}
						<NavigationLink
							text={"Конструктор"}
							logo={<BurgerIcon type="primary" />}
							to={"/"}
						/>
						<NavigationLink
							text={"Лента заказов"}
							logo={<ListIcon type="primary" />}
							to={"#"}
						/>
					</>
				)}
			</Navigation>

			<div className={styles.logo}>
				<Logo />
			</div>

			<Navigation className={styles.right}>
				{user.authenticated && (
					<>
						{" "}
						<NavigationLink
							text={"Личный кабинет"}
							to={"profile"}
							logo={<ProfileIcon type="primary" />}
						/>
					</>
				)}
			</Navigation>
		</header>
	);
}
