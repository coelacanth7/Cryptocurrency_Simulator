import {
	GETTING_REQUEST,
	GET_TICKER_SUCCESS,
	GET_REQUEST_FAILURE
} from "./actions";

const initialState = {
	coins: [],
	isFetching: false,
	error: null
};

export function cryptoReducer(state = initialState, action) {
	switch (action.type) {
		case GETTING_REQUEST:
			return {
				...state,
				isFetching: true,
				error: null
			};
		case GET_TICKER_SUCCESS:
			return {
				...state,
				coins: action.data,
				isFetching: false
			};
		case GET_REQUEST_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.error
			};
		default:
			return state;
	}
}
