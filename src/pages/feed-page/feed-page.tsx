import { useEffect } from "react";
import FeedList from "../../components/feed-list/feed-list";
import { startWs } from "../../services/actions/feed-actions";
import { useAppDispatch } from "../../services/store/store";
import styles from "./feed-page.module.css";

export default function FeedPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(startWs());
	}, []);

	return (
		<div className={styles.layout}>
			<FeedList />
			<div>Статистика</div>
		</div>
	);
}
