import PropTypes from "prop-types";
import styles from "./navigation-link.module.css";

export default function NavigationLink(props) {
	return (
		<li className={`mt-4 mb-4 pl-5 ${styles.link}`}>
			<a href="#">
				{props.logo}
				<p className={`text text_type_main-default ml-2 ${styles.text}`}>
					{props.text}
				</p>
			</a>
		</li>
	);
}

NavigationLink.propTypes = {
	logo: PropTypes.object,
	text: PropTypes.string,
};
