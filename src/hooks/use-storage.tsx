import { useEffect, useState } from "react";

export function useStorage(
	key: string,
	initialValue: string
): [string, (value: string) => void] {
	const raw = window.localStorage.getItem(key);

	const [storedValue, setStoredValue] = useState<string>(
		raw ? JSON.parse(raw) : initialValue
	);

	useEffect(() => {
		const value = window.localStorage.getItem(key);
		setStoredValue(JSON.parse(value || "") ?? initialValue);
	}, []);

	const setValue = (value: string) => {
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
