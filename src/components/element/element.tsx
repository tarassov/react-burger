import { FC, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./element.module.css";

import { remove } from "../../services/actions/elements-actions";

import { useDrag, useDrop } from "react-dnd";
import { IElement } from "../../services/model/types";
import { ISubstituteProps } from "../burger-constructor/burger-constructor";

interface IDropItem {
	element: IElement;
	sortIndex: number;
}

const Element: FC<{
	element: IElement;
	onSubstitute: (args: ISubstituteProps) => void;
}> = ({ element, onSubstitute }) => {
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

	const [, dropRef] = useDrop({
		accept: "element",

		hover: (item: IDropItem, monitor) => {
			if (!ref.current) return;
			if (item.element.id === element.id) return;
			if (Math.abs(item.sortIndex - element.sortIndex) > 1) return;
			const dragIndex = item.sortIndex;
			const hoverIndex = element.sortIndex;

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			if (clientOffset === null) return;
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			onSubstitute({
				from: item.element,
				to: element,
				hoverIndex: hoverIndex,
				dragIndex: dragIndex,
			});
			item.sortIndex = hoverIndex;
		},
	});

	const ref = useRef<HTMLDivElement>(null);
	dragRef(dropRef(ref));

	return (
		<div style={{ opacity }} ref={ref}>
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
};

export default Element;
