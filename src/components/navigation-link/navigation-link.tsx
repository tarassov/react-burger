import { FC } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./navigation-link.module.css";

interface INavigationLink {
	logo?: JSX.Element;
	text: string;
	to: string;
	medium?: boolean;
	matching?: boolean;
	exactMatching?: boolean;
}

const NavigationLink: FC<INavigationLink> = ({
	logo,
	text,
	to,
	medium,
	matching,
	exactMatching,
}) => {
	const resolved = useResolvedPath(to);
	const match = useMatch({
		path: resolved.pathname,
		end: exactMatching ?? false,
	});

	return (
		<Link to={to} className={`mt-4 mb-4 ${logo && "pl-5"} ${styles.link}`}>
			{logo}
			<p
				className={`text text_type_main-${medium ? "medium" : "default"} ${
					!match && matching && "text_color_inactive"
				} ${logo && "ml-2"} ${styles.text}`}
			>
				{text}
			</p>
		</Link>
	);
};

export default NavigationLink;
