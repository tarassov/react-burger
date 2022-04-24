import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./navigation-link.module.css";

export default function NavigationLink({ logo, text, to, medium }) {
	return (
		<Link to={to} className={`mt-4 mb-4 pl-5 ${styles.link}`}>
			{logo}
			<p
				className={`text text_type_main-${medium ? "medium" : "default"} ml-2 ${
					styles.text
				}`}
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
	mdeium: PropTypes.bool,
};
