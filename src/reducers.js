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
	VALIDATE_AMOUNT,
	RECIEVE_TRANSACTION_PAGE,
	UPDATE_BUY_SELL,
	GET_PORTFOLIO_SUCCESS,
	CLEAR_PORTFOLIO
} from "./actions";

import { changePercentColors } from "./helpers";

const initialState = {
	coins: [],
	myCoins: [
		{
			coin: "bitcoin",
			coinAmount: 0.08960894655722428
		},
		{
			coin: "litecoin",
			coinAmount: 5.660719137759261
		},
		{
			coin: "eos",
			coinAmount: 69.89438957734863
		}
	],
	searchResults: [],
	transactions: [
		{
			coin: "bitcoin",
			coinAmount: 0.08960894655722428,
			coinPrice: "11159.6",
			date: "1517027486466",
			type: "buy",
			usdAmount: "1000"
		},
		{
			coin: "litecoin",
			coinAmount: 5.660719137759261,
			coinPrice: "176.656",
			date: "1517027862220",
			type: "buy",
			usdAmount: "1000"
		},
		{
			coin: "eos",
			coinAmount: 69.89438957734863,
			coinPrice: "14.3073",
			date: "1517027714979",
			type: "buy",
			usdAmount: "1000"
		}
	],
	cash: 100000,
	selectedCoin: "",
	formCoin: {},
	formBool: false,
	formBoolMessage: "",
	amount: 0,
	buySell: "buy",
	formSubmitRedirect: false,
	portfolio: [],
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
			let coins = changePercentColors(action.data);
			return {
				...state,
				coins: coins,
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
			let cash = state.cash - action.data.amount;
			let myCoins = state.myCoins.map(myCoin => {
				if (myCoin.coin === action.data.coin) {
					return {
						coin: myCoin.coin,
						coinAmount:
							Number(myCoin.coinAmount) + Number(action.data.coinAmount)
					};
				}

				return myCoin;
			});
			return {
				...state,
				formSubmitRedirect: true,
				selectedCoin: "",
				formCoin: {},
				amount: 0,
				cash,
				myCoins,
				transactions: [
					...state.transactions,
					Object.assign(
						{},
						{
							date: action.data.date,
							coin: action.data.coin,
							type: action.data.type,
							usdAmount: action.data.amount,
							coinPrice: action.data.price,
							coinAmount: action.data.coinAmount
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
		case VALIDATE_AMOUNT:
			let formBool;
			let formBoolMessage;
			if (state.buySell === "buy") {
				if (state.cash >= action.amount) {
					formBool = true;
					formBoolMessage = "";
				} else {
					formBool = false;
					formBoolMessage = "You don't have enough cash for that";
				}
			}
			return {
				...state,
				amount: action.amount,
				formBool,
				formBoolMessage
			};
		case RECIEVE_TRANSACTION_PAGE:
			return {
				...state,
				formSubmitRedirect: false
			};
		case UPDATE_BUY_SELL:
			return {
				...state,
				buySell: action.data
			};
		case CLEAR_PORTFOLIO:
			return {
				...state,
				portfolio: []
			};
		case GET_PORTFOLIO_SUCCESS:
			let releventTransaction = state.transactions.filter(obj => {
				if (
					obj.coin === action.data[0].id &&
					state.portfolio.map(el => el.date).indexOf(obj.date) === -1
				) {
					return obj;
				}
			})[0];

			let currentValue =
				action.data[0].price_usd * releventTransaction.coinAmount;
			let profitOrLoss =
				action.data[0].price_usd * releventTransaction.coinAmount -
				releventTransaction.coinAmount * releventTransaction.coinPrice;

			return {
				...state,
				portfolio: [
					...state.portfolio,
					Object.assign(
						{},
						{
							coin: action.data[0].id,
							date: releventTransaction.date,
							quantity: releventTransaction.coinAmount,
							costBasis: releventTransaction.coinPrice,
							currentPrice: action.data[0].price_usd,
							currentValue: currentValue,
							profitOrLoss: profitOrLoss
						}
					)
				]
			};
		default:
			return state;
	}
}
