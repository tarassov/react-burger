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
		item: () => element,
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
			if (item.id === element.id) return;
			if (Math.abs(item.sortIndex - element.sortIndex) > 1) return;
			const dragIndex = item.sortIndex;
			const hoverIndex = element.sortIndex;
			// Определяем границы карточки ингредиента
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Определяем середину карточки по оси Y нашего ингредиента
			// В момент пересечения этой границы, перетаскиваемым ингредиентом
			// Мы будем менять их местами
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Получаем текущую позицию курсора,
			// относительно текущего контейнера
			const clientOffset = monitor.getClientOffset();
			// Вычисляем координаты курсора и координаты середины карточки
			// на которую мы навели наш перетаскиваемый ингредиент
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Условие для перетаскивании элементов сверху вниз
			// Если перетаскиваемый ингредиент пересекает середину
			// текущего ингредиента, то мы идем дальше и выполняем moveCard
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Условие для перетаскивании элементов снизу вверх
			// Происходит тоже самое что и выше, только в обратном порядке
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Выполняем наш коллбэк с перемещением карточек внутри массива
			moveElement(item, element);
			//	item.sortIndex = hoverIndex;
			//	element.sortIndex = dragIndex;
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
