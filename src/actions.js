export const GETTING_REQUEST = "GET_REQUEST";
export const GET_TICKER_SUCCESS = "GET_TICKER_SUCCESS";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";
export const GET_SEARCH_RESULTS = "GET_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const MAKE_A_TRADE = "MAKE_A_TRADE";
export const SET_SELECTED_COIN = "SET_SELECTED_COIN";
export const SET_FORM_BOOL = "SET_FORM_BOOL";
export const GET_FORM_COIN_SUCCESS = "GET_FORM_COIN_SUCCESS";

export function gettingRequest() {
	return {
		type: GETTING_REQUEST
	};
}

export function getTickerSuccess(data) {
	return {
		type: GET_TICKER_SUCCESS,
		data
	};
}

export function getRequestFailure(error) {
	return {
		type: GET_REQUEST_FAILURE,
		error
	};
}

export function getSearchResults(data) {
	return {
		type: GET_SEARCH_RESULTS,
		data
	};
}

export function clearSearchResults() {
	return {
		type: CLEAR_SEARCH_RESULTS
	};
}

export function makeATrade(data) {
	return {
		type: MAKE_A_TRADE,
		data
	};
}

export function setSelectedCoin(coin) {
	return {
		type: SET_SELECTED_COIN,
		coin
	};
}

export function setFormBool(bool) {
	return {
		type: SET_FORM_BOOL,
		bool
	};
}

export function getFormCoinSuccess(data) {
	return {
		type: GET_FORM_COIN_SUCCESS,
		data
	};
}

export function _request(url, successCallback) {
	return dispatch => {
		dispatch(gettingRequest());
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status}: ${response.statusText}`);
				}
				return response.json();
			})
			.then(json => {
				console.log("actions json response", json);
				dispatch(successCallback(json));
			})
			.catch(error => {
				dispatch(getRequestFailure(error));
			});
	};
}
