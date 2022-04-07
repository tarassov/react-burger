import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./element.module.css";

import { remove } from "../../services/actions/elements";

import { elementPropTypes } from "../../utils/prop-types";
import { useDrag } from "react-dnd";

export default function Element({ element, index }) {
	const dispatch = useDispatch();

	const onRemoveElement = useCallback(
		(element) => () => {
			dispatch(remove(element));
		},
		[dispatch]
	);

	const [{ opacity }, dragRef] = useDrag({
		type: "element",
		element: () => ({ id: element.id, index }),
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1,
		}),
	});

	return (
		<div style={{ opacity }} ref={dragRef}>
			<div className={styles.draggable}>
				<DragIcon type="primary" />
			</div>
			<div div className={`pl-1 ${styles.ingredient}`}>
				<ConstructorElement
					isLocked={false}
					text={element.name}
					price={element.price}
					handleClose={onRemoveElement(element)}
					thumbnail={element.image_mobile}
				/>
			</div>
		</div>
	);
}

Element.propTypes = {
	element: elementPropTypes.isRequired,
};
