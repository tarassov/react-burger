import { FC } from "react";
import styles from "./navigation.module.css";

const Navigation: FC<{ className?: string }> = ({ className, children }) => {
	return (
		<nav className={`ml-5 mt-4 mb-4 ${styles.navigation} ${className}`}>
			{children}
		</nav>
	);
};
export default Navigation;
