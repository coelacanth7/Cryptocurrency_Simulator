export const GETTING_REQUEST = "GET_REQUEST";
export const GET_TICKER_SUCCESS = "GET_TICKER_SUCCESS";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";

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