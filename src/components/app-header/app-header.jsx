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

export default function AppHeader() {
  return (
    <header className={styles.container}>
      <Navigation className={styles.left}>
        <NavigationLink
          text={"Конструктор"}
          logo={<BurgerIcon type="primary" />}
        />
        <NavigationLink
          text={"Лента заказов"}
          logo={<ListIcon type="primary" />}
        />
      </Navigation>
      <div className={styles.logo}>
        <Logo />
      </div>

      <Navigation className={styles.right}>
        <NavigationLink
          text={"Личный кабинет"}
          logo={<ProfileIcon type="primary" />}
        />
      </Navigation>
    </header>
  );
}
