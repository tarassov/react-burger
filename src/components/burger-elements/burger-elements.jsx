import { useCallback } from "react";

import PropTypes from "prop-types";
import styles from "./burger-elements.module.css";

import { elementPropTypes } from "../../utils/prop-types";
import Element from "../element/element";

export default function BurgerElements({ elements, onSubstitute }) {
	const moveElement = useCallback(
		(fromElement, toElement) => {
			onSubstitute(fromElement, toElement);
		},
		[onSubstitute, elements]
	);

	return (
		<div className={styles.list}>
			{elements.map((element) => {
				return (
					<div key={element.id}>
						<Element element={element} moveElement={moveElement} />
					</div>
				);
			})}
		</div>
	);
}

BurgerElements.propTypes = {
	elements: PropTypes.arrayOf(elementPropTypes.isRequired).isRequired,
};
