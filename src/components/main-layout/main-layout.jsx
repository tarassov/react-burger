import { useEffect, useState, useContext, useCallback } from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-indredients";
import styles from "./main-layout.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { CartContext } from "../../services/app-context";

const URL = "https://norma.nomoreparties.space/api/";

const getUrl = (endpoint) => `${URL}${endpoint}`;

const generateRandomCart = (data) => {
  const cart = [];

  if (!data || data.length === 0) return cart;

  const buns = data.filter((ingredient) => ingredient.type === "bun");
  const bunIndex = Math.floor(Math.random() * buns.length);
  cart.push(buns[bunIndex]);

  const ingredients = data.filter((ingredient) => ingredient.type !== "bun");
  const ingredientCount = Math.random() * (10 - 4) + 4;
  for (let i = 0; i < ingredientCount; i++) {
    cart.push(ingredients[Math.floor(Math.random() * ingredients.length)]);
  }
  return cart;
};

export default function MainLayout() {
  const [ingredients, setIngredients] = useState([]);
  const [order, setOrder] = useState({});
  const [isOrderPosting, setIsOrderPosting] = useState(false);
  const [isOrderError, setIsOrderError] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState();
  const [data, setData] = useState([]);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isOpenIngredient, setIsOpenIngredient] = useState(false);
  const { cartState, cartDispatcher } = useContext(CartContext);

  const onAddIngredient = useCallback(
    (ingredient) => {
      if (
        ingredient.type === "bun" &&
        ingredients.some((i) => i.type === "bun")
      ) {
        setIngredients([
          ...ingredients.filter((x) => x.type !== "bun"),
          ingredient,
        ]);
      } else {
        setIngredients([...ingredients, ingredient]);
      }
    },
    [ingredients]
  );

  const fetchData = () => {
    window
      .fetch(getUrl("ingredients"))
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response.status);
        }
        return response.json();
      })
      .then((json) => setData(json.data))
      .catch((e) => console.log(e));
  };

  const postOrder = useCallback(() => {
    setOrder({ number: "" });
    setIsOrderError(false);
    setIsOrderPosting(true);

    const ids = cartState.cart.map((ingredient) => ingredient._id);

    window
      .fetch(getUrl("orders"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ids }),
      })
      .then((response) => {
        if (!response.ok) {
          setIsOrderError(true);
          setIsOrderPosting(false);
          return Promise.reject(response.status);
        }
        return response.json();
      })
      .then((json) => {
        setOrder(json.order);
        setIsOrderPosting(false);
      })
      .catch((e) => console.log(e));
  }, [cartState.cart]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const ingredients = generateRandomCart(data);
    cartDispatcher({ type: "load", ingredients: ingredients });
  }, [data, cartDispatcher]);

  //open OrderDetails as modal
  const onPerformOrder = useCallback(() => {
    postOrder();
    setIsOpenOrder(true);
  }, [postOrder]);

  const onCloseModalOrder = useCallback(() => {
    setIsOpenOrder(false);
  }, []);

  //open IngredientDetails as modal
  const onIngredientClick = useCallback((ingredient) => {
    setSelectedIngredient(ingredient);
    setIsOpenIngredient(true);
  }, []);

  const onCloseIngredient = useCallback(() => {
    setIsOpenIngredient(false);
  }, []);

  return (
    <main className={styles.layout}>
      {data && (
        <BurgerIngredients
          data={data}
          onAddIngredient={onAddIngredient}
          onIngredientClick={onIngredientClick}
        />
      )}
      <BurgerConstructor onPerformOrderClick={onPerformOrder} />

      {isOpenOrder && (
        <Modal onClose={onCloseModalOrder}>
          <OrderDetails
            order={order}
            isOrderPosting={isOrderPosting}
            isOrderError={isOrderError}
          />
        </Modal>
      )}

      {isOpenIngredient && (
        <Modal onClose={onCloseIngredient}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </main>
  );
}
