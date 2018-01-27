import React, { Component } from "react";
import { connect } from "react-redux";
import serialize from "form-serialize";

import TradeForm from "../components/TradeForm";
import {
	makeATrade,
	getSearchResults,
	clearSearchResults,
	_request,
	getFormCoinSuccess,
	setSelectedCoin,
	setFormBool,
	validateAmount,
	updateBuySell
} from "../actions";
import { fuseHelper } from "../helpers";
import { arrayOfCoinIds } from "../arrayOfCoinIds";

class TradeContainer extends Component {
	componentWillMount() {
		this.props.dispatchOnLoad();
	}

	render() {
		return <TradeForm {...this.props} />;
	}
}

const mapStateToProps = state => {
	return {
		formCoin: state.formCoin,
		cash: state.cash,
		searchResults: state.searchResults,
		selectedCoin: state.selectedCoin,
		formBool: state.formBool,
		formBoolMessage: state.formBoolMessage,
		amount: state.amount,
		formSubmitRedirect: state.formSubmitRedirect,
		buySell: state.buySell
	};
};

var timeout = null;
const mapDispatchToProps = (dispatch, ownprops) => {
	return {
		makeATrade: e => {
			e.preventDefault();
			const form = e.target;
			const data = serialize(form, { hash: true });
			console.log(data);
			dispatch(makeATrade(data));
		},

		validateCoin: e => {
			e.preventDefault();
			const coin = e.target.value.toLowerCase();
			dispatch(setSelectedCoin(coin));
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				console.log(coin);
				if (arrayOfCoinIds.includes(coin)) {
					console.log("yes");
					const url = `https://api.coinmarketcap.com/v1/ticker/${coin}/`;
					dispatch(clearSearchResults());
					// dispatch(setFormBool(true));
					dispatch(_request(url, getFormCoinSuccess));
				} else {
					var fuseResults = fuseHelper(coin);
					dispatch(getSearchResults(fuseResults));
					dispatch(setFormBool(false, "coin selection is no good"));
				}
			}, 1000);
		},

		validateAmount: e => {
			e.preventDefault();
			const amount = e.target.value;
			console.log(amount);
			dispatch(validateAmount(amount));
		},

		clickACoin: e => {
			const coin = e.target.getAttribute("data");
			const url = `https://api.coinmarketcap.com/v1/ticker/${coin}/`;
			dispatch(clearSearchResults());
			dispatch(setSelectedCoin(coin));
			// dispatch(setFormBool(true));
			dispatch(_request(url, getFormCoinSuccess));
		},

		dispatchOnLoad: () => {
			dispatch(clearSearchResults());
		},

		onChangeBuySell: e => {
			const buySell = e.target.value;
			dispatch(updateBuySell(buySell));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);
