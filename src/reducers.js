import {
	GETTING_REQUEST,
	GET_TICKER_SUCCESS,
	GET_REQUEST_FAILURE,
	GET_SEARCH_RESULTS,
	CLEAR_SEARCH_RESULTS,
	MAKE_A_TRADE,
	SET_SELECTED_COIN,
	SET_FORM_BOOL
} from "./actions";

const initialState = {
	coins: [],
	searchResults: [],
	transactions: [],
	pendingTransaction: {},
	cash: 123456,
	selectedCoin: "",
	formBool: true,
	isFetching: true,
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
		case GET_SEARCH_RESULTS:
			return {
				...state,
				searchResults: action.data
			};
		case CLEAR_SEARCH_RESULTS:
			return {
				...state,
				searchResults: []
			};
		case MAKE_A_TRADE:
			return {
				...state,
				transactions: [...state.transactions, action.data]
			};
		case SET_SELECTED_COIN:
			return {
				...state,
				selectedCoin: action.coin
			};
		case SET_FORM_BOOL:
			return {
				...state,
				formBool: action.bool
			};
		default:
			return state;
	}
}
