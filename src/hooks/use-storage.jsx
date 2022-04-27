import { useEffect, useState } from "react";

export function useStorage(key, initialValue) {
	const raw = window.localStorage.getItem(key);

	const [storedValue, setStoredValue] = useState(
		raw ? JSON.parse(raw) : initialValue
	);

	useEffect(() => {
		const value = window.localStorage.getItem(key);
		setStoredValue(JSON.parse(value) ?? initialValue);
	}, []);

	const setValue = (value) => {
		try {
			setStoredValue(value);

			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		} catch (e) {
			console.log(e);
		}
	};
	return [storedValue, setValue];
}
