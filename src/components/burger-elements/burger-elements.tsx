import styles from "./burger-elements.module.css";

import Element from "../element/element";
import { FC } from "react";
import { IElement } from "../../services/interfaces/model";
import { ISubstituteProps } from "../burger-constructor/burger-constructor";

const BurgerElements: FC<{
	elements: Array<IElement>;
	onSubstitute: (args: ISubstituteProps) => void;
}> = ({ elements, onSubstitute }) => {
	return (
		<div className={styles.list}>
			{elements.map((element) => {
				return (
					<Element
						key={element.id}
						element={element}
						onSubstitute={onSubstitute}
					/>
				);
			})}
		</div>
	);
};

export default BurgerElements;
