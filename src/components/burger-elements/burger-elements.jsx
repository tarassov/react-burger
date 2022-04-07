import { useCallback } from "react";

import PropTypes from "prop-types";
import styles from "./burger-elements.module.css";

import { elementPropTypes } from "../../utils/prop-types";
import Element from "../element/element";

export default function BurgerElements({ elements, onSubstitute }) {
	const moveElement = useCallback(
		(dragIndex, hoverIndex) => {
			// Получаем перетаскиваемый ингредиент
			const fromElement = elements[dragIndex];
			const toElement = elements[hoverIndex];
			onSubstitute(fromElement, toElement);
		},
		[onSubstitute]
	);

	return (
		<div className={styles.list}>
			{elements.map((element, index) => {
				return (
					<div key={element.id}>
						<Element
							element={element}
							index={index}
							moveElement={moveElement}
						/>
					</div>
				);
			})}
		</div>
	);
}

BurgerElements.propTypes = {
	elements: PropTypes.arrayOf(elementPropTypes.isRequired).isRequired,
};
