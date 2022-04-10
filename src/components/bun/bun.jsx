import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./bun.module.css";

import { elementPropTypes } from "../../utils/prop-types";

export default function Bun({ bun, type }) {
	return (
		<>
			{bun ? (
				<div className={"pl-8"}>
					<ConstructorElement
						type={type}
						isLocked={true}
						text={bun?.name + (type === "bottom" ? " (низ)" : " (верх)")}
						price={bun?.price}
						thumbnail={bun?.image_mobile}
					/>
				</div>
			) : (
				<div className={`${styles.placeholder}`} />
			)}
		</>
	);
}

Bun.propTypes = {
	bun: elementPropTypes,
	type: PropTypes.string.isRequired,
};
