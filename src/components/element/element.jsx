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

export default function Element({ element, index, moveElement }) {
	const dispatch = useDispatch();

	const onRemoveElement = useCallback(
		(element) => () => {
			dispatch(remove(element));
		},
		[dispatch]
	);

	const [{ opacity }, dragRef] = useDrag({
		type: "element",
		item: () => ({ id: element.id, index }),
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1,
		}),
	});

	const [{ handlerId }, dropRef] = useDrop({
		// Указываем тип получаемых элементов, чтобы dnd понимал,
		// в какой контейнер можно класть перетаскиваемый элемент, а в какой нельзя.
		// Элементы и контейнеры с разными типами не будут взаимодействовать
		accept: "element",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover: (item, monitor) => {
			const dragIndex = item.index;
			const hoverIndex = index;
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

			// if dragging down, continue only when hover is smaller than middle Y
			if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
			// if dragging up, continue only when hover is bigger than middle Y
			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

			moveElement(dragIndex, hoverIndex);
			item.index = hoverIndex;
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
