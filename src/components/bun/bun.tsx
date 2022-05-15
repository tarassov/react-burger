import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./bun.module.css";
import { FC } from "react";
import { IElement } from "../../services/interfaces/model";

const Bun: FC<{ bun: IElement }> = ({ bun }) => {
	return (
		<>
			{bun._id ? (
				<div className={"pl-8"}>
					<ConstructorElement
						type={bun?.bun_type}
						isLocked={true}
						text={
							bun?.name + (bun.bun_type === "bottom" ? " (низ)" : " (верх)")
						}
						price={bun ? bun.price : 0}
						thumbnail={bun ? bun.image_mobile : ""}
					/>
				</div>
			) : (
				<div className={`${styles.placeholder}`} />
			)}
		</>
	);
};

export default Bun;
