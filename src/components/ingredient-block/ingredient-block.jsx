import { useMemo } from "react";
import styles from "./ingredient-block.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { ingredientPropTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";

export default function IngredientBlock({
  data,
  groupedCart,
  type,
  onIngredientClick,
}) {
  const preparedData = useMemo(() => {
    return data
      .filter((ingredient) => ingredient.type === type)
      .map((ingredient) => {
        var count = groupedCart[ingredient._id];
        return (
          <IngredientCard
            key={ingredient._id}
            count={count}
            ingredient={ingredient}
            onIngredientClick={onIngredientClick}
          />
        );
      });
  }, [data, groupedCart, onIngredientClick, type]);

  return <div className={styles.grid}>{preparedData}</div>;
}

IngredientBlock.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired),
  type: PropTypes.string.isRequired,
  groupedCart: PropTypes.object.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};
