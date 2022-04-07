// import { useCallback } from "react";
// import { useDispatch } from "react-redux";

import PropTypes from "prop-types";
import styles from "./burger-elements.module.css";

import { elementPropTypes } from "../../utils/prop-types";
import Element from "../element/element";

export default function BurgerElements({ elements }) {
	//const dispatch = useDispatch();

	return (
		<div className={styles.list}>
			{elements.map((element, index) => {
				return (
					<div key={element.id}>
						<Element element={element} index={index} />
					</div>
				);
			})}
		</div>
	);
}

BurgerElements.propTypes = {
	elements: PropTypes.arrayOf(elementPropTypes.isRequired).isRequired,
};
