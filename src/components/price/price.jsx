import PropTypes from "prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./price.module.css";

export default function Price({ price, size }) {
  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-${size} mr-3 ${styles.price}`}>
        {price}
      </p>
      <CurrencyIcon type="primary" />
    </div>
  );
}

Price.defaultProps = {
  size: "default",
};

Price.propTypes = {
  size: PropTypes.string,
  price: PropTypes.number.isRequired,
};
