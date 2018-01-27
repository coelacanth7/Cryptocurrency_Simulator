import {
	GETTING_REQUEST,
	GET_TICKER_SUCCESS,
	GET_REQUEST_FAILURE,
	GET_SEARCH_RESULTS,
	CLEAR_SEARCH_RESULTS,
	MAKE_A_TRADE,
	SET_SELECTED_COIN,
	SET_FORM_BOOL,
	GET_FORM_COIN_SUCCESS,
	UPDATE_AMOUNT,
	RECIEVE_TRANSACTION_PAGE
} from "./actions";

const initialState = {
	coins: [],
	searchResults: [],
	transactions: [],
	cash: 123456,
	selectedCoin: "",
	formCoin: {},
	formBool: true,
	formBoolMessage: "",
	amount: 0,
	formSubmitRedirect: false,
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
				formSubmitRedirect: true,
				transactions: [
					...state.transactions,
					Object.assign(
						{},
						{
							date: action.data.date,
							coin: action.data.coin,
							type: action.data.type,
							usdAmount: action.data.amount,
							coinPrice: state.formCoin.price_usd,
							coinAmount: action.data.amount / state.formCoin.price_usd
						}
					)
				]
			};
		case SET_SELECTED_COIN:
			return {
				...state,
				selectedCoin: action.coin
			};
		case SET_FORM_BOOL:
			return {
				...state,
				formBool: action.bool,
				formBoolMessage: action.message
			};
		case GET_FORM_COIN_SUCCESS:
			return {
				...state,
				formCoin: action.data[0],
				isFetching: false
			};
		case UPDATE_AMOUNT:
			return {
				...state,
				amount: action.amount
			};
		case RECIEVE_TRANSACTION_PAGE:
			return {
				...state,
				formSubmitRedirect: false
			};
		default:
			return state;
	}
}
