import PropTypes from "prop-types";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./navigation-link.module.css";

export default function NavigationLink({ logo, text, to, medium, matching }) {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

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
}

NavigationLink.propTypes = {
	logo: PropTypes.object,
	text: PropTypes.string,
	to: PropTypes.string.isRequired,
	medium: PropTypes.bool,
	matching: PropTypes.bool,
};
