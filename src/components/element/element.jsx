import PropTypes from "prop-types";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./element.module.css";

import { remove } from "../../services/actions/elements";

import { elementPropTypes } from "../../utils/prop-types";
import { useDrag, useDrop } from "react-dnd";

export default function Element({ element, moveElement }) {
	const dispatch = useDispatch();

	const onRemoveElement = useCallback(
		(element) => () => {
			dispatch(remove(element));
		},
		[dispatch]
	);

	const [{ opacity }, dragRef] = useDrag({
		type: "element",
		item: () => ({ element, sortIndex: element.sortIndex }),
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1,
		}),
	});

	const [{ handlerId }, dropRef] = useDrop({
		accept: "element",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover: (item, monitor) => {
			if (item.id === element.id) return;
			if (Math.abs(item.sortIndex - element.sortIndex) > 1) return;
			const dragIndex = item.sortIndex;
			const hoverIndex = element.sortIndex;

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			moveElement(item.element, element, hoverIndex, dragIndex);
			item.sortIndex = hoverIndex;
		},
	});
	const ref = useRef(null);
	const dragDropRef = dragRef(dropRef(ref));
	const preventDefault = (e) => e.preventDefault();
	return (
		<div
			style={{ opacity }}
			ref={dragDropRef}
			data-handler-id={handlerId}
			onDrop={preventDefault}
		>
			<div className={styles.draggable}>
				<DragIcon type="primary" />
			</div>
			<div className={`pl-1 ${styles.ingredient}`}>
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
	moveElement: PropTypes.func.isRequired,
};
