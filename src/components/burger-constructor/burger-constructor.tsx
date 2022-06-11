import { useCallback, useMemo, FC } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Price from "../price/price";

import { add, update } from "../../services/actions/elements-actions";
import { selectAllElements } from "../../services/adapters/elements-adapters";
import BurgerElements from "../burger-elements/burger-elements";
import Bun from "../bun/bun";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { IElement, IIngredient } from "../../services/model/types";

export interface ISubstituteProps {
	from: IElement;
	to: IElement;
	hoverIndex: number;
	dragIndex: number;
}

export const BurgerConstructor: FC<{ onPerformOrderClick: () => void }> = ({
	onPerformOrderClick,
}) => {
	const dispatch = useAppDispatch();

	const elements = useAppSelector(selectAllElements);
	const totalPrice = useAppSelector((store) => store.elements.totalPrice);

	const [{ isHover }, dropTargerRef] = useDrop({
		accept: "ingredient",
		collect: (monitor: DropTargetMonitor) => ({
			isHover: monitor.isOver(),
		}),
		drop(ingredient: IIngredient) {
			dispatch(add(ingredient));
		},
	});

	const onSubstitute = useCallback(
		(args: ISubstituteProps) => {
			if (args.hoverIndex !== args.dragIndex) {
				dispatch(
					update([
						{ ...args.from, sortIndex: args.hoverIndex },
						{ ...args.to, sortIndex: args.dragIndex },
					])
				);
			}
		},
		[dispatch]
	);

	const bun = useMemo(() => {
		return elements.find((x) => x.type === "bun");
	}, [elements]);

	const listElements = useMemo(() => {
		return elements.filter((x) => x.type !== "bun");
	}, [elements]);

	return (
		<section className={`pl-4 ml-5 mt-25 ${styles.container}`}>
			<div className={`${styles.cart}`}>
				<div
					className={`${styles.elements} ${isHover && styles.onHover}`}
					ref={dropTargerRef}
					data-test-id={`drop-target`}
				>
					<Bun bun={{ ...bun, bun_type: "top" } as IElement} />
					<BurgerElements elements={listElements} onSubstitute={onSubstitute} />
					<Bun bun={{ ...bun, bun_type: "bottom" } as IElement} />
				</div>
			</div>
			<div className={`mt-10 ${styles.total}`}>
				<div className={`mr-10 ${styles.price}`}>
					<Price price={totalPrice} size="default" />
				</div>
				<Button type="primary" size="large" onClick={onPerformOrderClick}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

export default BurgerConstructor;
