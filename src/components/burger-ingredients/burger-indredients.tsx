import React, { useRef, useCallback, useMemo, FC } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientBlock from "../ingredient-block/ingredient-block";
import { useSelector } from "react-redux";
import { selectAllIngredients } from "../../services/adapters/ingredients-adapters";
import { RootState } from "../../services/store/store";
import { IIngredient } from "../../services/model/types";

const BurgerIngredients: FC<{
	onIngredientClick: (ingredient: IIngredient) => void;
}> = ({ onIngredientClick }) => {
	const bunRef = useRef<HTMLParagraphElement>(null);
	const sauceRef = useRef<HTMLParagraphElement>(null);
	const mainRef = useRef<HTMLParagraphElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	const [currentTab, setCurrentTab] = React.useState("bun");

	const groupedCart = useSelector(
		(store: RootState) => store.elements.groupedCart
	);

	const ingredients = useSelector(selectAllIngredients);

	const buns = useMemo(() => {
		return ingredients.filter((i) => i.type === "bun");
	}, [ingredients]);
	const mains = useMemo(() => {
		return ingredients.filter((i) => i.type === "main");
	}, [ingredients]);
	const sauces = useMemo(() => {
		return ingredients.filter((i) => i.type === "sauce");
	}, [ingredients]);

	const handleScroll = useCallback(() => {
		if (listRef.current) {
			const position = listRef.current.scrollTop + listRef.current.offsetTop;
			if (sauceRef.current && sauceRef.current.offsetTop > position) {
				setCurrentTab("bun");
			} else if (
				mainRef.current &&
				sauceRef.current &&
				mainRef.current.offsetTop > position &&
				position >= sauceRef.current.offsetTop
			) {
				setCurrentTab("sauce");
			} else {
				setCurrentTab("main");
			}
		}
	}, []);

	const onTabClick = useCallback((value) => {
		setCurrentTab(value);
		switch (value) {
			case "bun":
				if (bunRef.current)
					bunRef.current.scrollIntoView({ behavior: "smooth" });
				break;
			case "sauce":
				if (sauceRef.current)
					sauceRef.current.scrollIntoView({ behavior: "smooth" });
				break;
			case "main":
				if (mainRef.current)
					mainRef.current.scrollIntoView({ behavior: "smooth" });
				break;
			default:
				if (bunRef.current)
					bunRef.current.scrollIntoView({ behavior: "smooth" });
				break;
		}
	}, []);

	return (
		<section className={`mr-5 mt-10 ${styles.container}`}>
			<p className="text text_type_main-large">Соберите бургер</p>
			<div className={styles.tab}>
				<Tab value="bun" active={currentTab === "bun"} onClick={onTabClick}>
					Булки
				</Tab>
				<Tab value="sauce" active={currentTab === "sauce"} onClick={onTabClick}>
					Соусы
				</Tab>
				<Tab value="main" active={currentTab === "main"} onClick={onTabClick}>
					Начинки
				</Tab>
			</div>
			<div className={`${styles.list}`} onScroll={handleScroll} ref={listRef}>
				<p className="mt-10 text text_type_main-medium" ref={bunRef}>
					Булки
				</p>
				<IngredientBlock
					ingredients={buns}
					groupedCart={groupedCart}
					onIngredientClick={onIngredientClick}
				/>
				<p className="mt-10 text text_type_main-medium" ref={sauceRef}>
					Соусы
				</p>
				<IngredientBlock
					ingredients={sauces}
					groupedCart={groupedCart}
					onIngredientClick={onIngredientClick}
				/>
				<p className="mt-10 text text_type_main-medium" ref={mainRef}>
					Начинки
				</p>
				<IngredientBlock
					ingredients={mains}
					groupedCart={groupedCart}
					onIngredientClick={onIngredientClick}
				/>
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
