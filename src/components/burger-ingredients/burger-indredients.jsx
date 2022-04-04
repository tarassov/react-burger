import React, { useRef, useContext, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../utils/prop-types";
import styles from "./burger-ingredients.module.css";
import IngredientBlock from "../ingredient-block/ingredient-block";
import { CartContext } from "../../services/app-context";

export default function BurgerIngredients(props) {
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const listRef = useRef(null);

  const [currentTab, setCurrentTab] = React.useState("bun");
  const { cartState } = useContext(CartContext);

  const groupedCart = useMemo(() => {
    const newGroupedCart = {};
    cartState.cart.forEach((element) => {
      if (newGroupedCart[element._id] === undefined) {
        if (element.type === "bun") {
          newGroupedCart[element._id] = 2;
        } else {
          newGroupedCart[element._id] = 1;
        }
      } else {
        newGroupedCart[element._id] = newGroupedCart[element._id] + 1;
      }
    });
    return newGroupedCart;
  }, [cartState.cart]);

  const handleScroll = useCallback(() => {
    const position = listRef.current.scrollTop + 264;
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
          data={props.data}
          groupedCart={groupedCart}
          type={"bun"}
          onAddIngredient={props.onAddIngredient}
          onIngredientClick={props.onIngredientClick}
        />
        <p className="mt-10 text text_type_main-medium" ref={sauceRef}>
          Соусы
        </p>
        <IngredientBlock
          data={props.data}
          groupedCart={groupedCart}
          type={"sauce"}
          onAddIngredient={props.onAddIngredient}
          onIngredientClick={props.onIngredientClick}
        />
        <p className="mt-10 text text_type_main-medium" ref={mainRef}>
          Начинки
        </p>
        <IngredientBlock
          data={props.data}
          groupedCart={groupedCart}
          type={"main"}
          onAddIngredient={props.onAddIngredient}
          onIngredientClick={props.onIngredientClick}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired),
  onAddIngredient: PropTypes.func.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};
