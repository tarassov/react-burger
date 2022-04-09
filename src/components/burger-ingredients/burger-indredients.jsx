import React, { useRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientBlock from "../ingredient-block/ingredient-block";
import { useSelector } from "react-redux";
import { selectAllIngredients } from "../../services/adapters/ingredients-adapters";

export default function BurgerIngredients(props) {
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);
	const listRef = useRef(null);

	const [currentTab, setCurrentTab] = React.useState("bun");

	const groupedCart = useSelector((store) => store.elements.groupedCart);

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
		const position = listRef.current.scrollTop + listRef.current.offsetTop;
		if (sauceRef.current.offsetTop > position) {
			setCurrentTab("bun");
		} else if (
			mainRef.current.offsetTop > position &&
			position >= sauceRef.current.offsetTop
		) {
			setCurrentTab("sauce");
		} else {
			setCurrentTab("main");
		}
	}, []);

	const onTabClick = useCallback((value) => {
		setCurrentTab(value);
		switch (value) {
			case "bun":
				bunRef.current.scrollIntoView({ behavior: "smooth" });
				break;
			case "sauce":
				sauceRef.current.scrollIntoView({ behavior: "smooth" });
				break;
			case "main":
				mainRef.current.scrollIntoView({ behavior: "smooth" });
				break;
			default:
				bunRef.current.scrollIntoView({ behavior: "smooth" });
				break;
		}
	}, []);

	return (
		<section className={`mr-5 mt-10 ${styles.container}`}>
			<p className="text text_type_main-large">Соберите бургер</p>
			<div style={{ display: "flex" }}>
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
					data={buns}
					groupedCart={groupedCart}
					onAddIngredient={props.onAddIngredient}
					onIngredientClick={props.onIngredientClick}
				/>
				<p className="mt-10 text text_type_main-medium" ref={sauceRef}>
					Соусы
				</p>
				<IngredientBlock
					data={sauces}
					groupedCart={groupedCart}
					onAddIngredient={props.onAddIngredient}
					onIngredientClick={props.onIngredientClick}
				/>
				<p className="mt-10 text text_type_main-medium" ref={mainRef}>
					Начинки
				</p>
				<IngredientBlock
					data={mains}
					groupedCart={groupedCart}
					onAddIngredient={props.onAddIngredient}
					onIngredientClick={props.onIngredientClick}
				/>
			</div>
		</section>
	);
}

BurgerIngredients.propTypes = {
	onIngredientClick: PropTypes.func.isRequired,
};
