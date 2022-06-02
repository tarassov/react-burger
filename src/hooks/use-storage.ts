export function useStorage<T extends string | number>(
	key: string,
	initialValue: T
): [() => T, (value: T) => void] {
	const storedValue = (): T => {
		if (typeof initialValue === "number") {
			return Number(window.localStorage.getItem(key) ?? initialValue) as T;
		} else {
			console.log(window.localStorage.getItem(key));
			return (window.localStorage.getItem(key) ?? initialValue) as T;
		}
	};

	const setValue = (value: T) => {
		try {
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, value.toString());
			}
		} catch (e) {
			console.log(e);
		}
	};
	return [storedValue, setValue];
}
