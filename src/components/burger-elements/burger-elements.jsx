import PropTypes from "prop-types";
import styles from "./burger-elements.module.css";

import { elementPropTypes } from "../../utils/prop-types";
import Element from "../element/element";

export default function BurgerElements({ elements, onSubstitute }) {
	return (
		<div className={styles.list}>
			{elements.map((element) => {
				return (
					<Element
						key={element.id}
						element={element}
						onSubstitute={onSubstitute}
					/>
				);
			})}
		</div>
	);
}

BurgerElements.propTypes = {
	elements: PropTypes.arrayOf(elementPropTypes.isRequired).isRequired,
};
