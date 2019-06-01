import { IS_LOGGED_IN, LOGIN_USER } from "./actionTypes";

export default function reducer(state, { type, payload }) {
	switch (type) {
		case LOGIN_USER:
			return {
				...state,
				currentUser: payload
			};
		case IS_LOGGED_IN:
			return {
				...state,
				isAuth: payload
			};
		default:
			return state;
	}
}
