import { useLocation } from "react-router-dom";

type LocationProps = {
	state: {
		from?: Location;
		background?: Location;
	};
};

export function useLocationTyped() {
	const location = useLocation() as unknown as LocationProps;

	return location;
}
