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
	setFormBool
} from "../actions";
import { fuseHelper } from "../helpers";
import { arrayOfCoinIds } from "../arrayOfCoinIds";

class TradeContainer extends Component {
	componentWillMount() {
		this.props.dispatchOnLoad();
	}

	render() {
		const {
			formCoin,
			cash,
			makeATrade,
			validateCoin,
			searchResults,
			clickACoin,
			selectedCoin,
			formBool
		} = this.props;

		return (
			<TradeForm
				formCoin={formCoin}
				cash={cash}
				makeATrade={makeATrade}
				validateCoin={validateCoin}
				searchResults={searchResults}
				clickACoin={clickACoin}
				selectedCoin={selectedCoin}
				formBool={formBool}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		formCoin: state.formCoin,
		cash: state.cash,
		searchResults: state.searchResults,
		selectedCoin: state.selectedCoin,
		formBool: state.formBool
	};
};

var timeout = null;
const mapDispatchToProps = (dispatch, ownprops) => {
	return {
		makeATrade: () => {
			dispatch(makeATrade());
		},
		validateCoin: e => {
			e.preventDefault();
			const enteredCoin = e.target.value.toLowerCase();
			dispatch(setSelectedCoin(enteredCoin));
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				console.log(enteredCoin);
				if (arrayOfCoinIds.includes(enteredCoin)) {
					console.log("yes");
					const url = `https://api.coinmarketcap.com/v1/ticker/${enteredCoin}/`;
					dispatch(clearSearchResults());
					dispatch(setFormBool(true));
					dispatch(_request(url, getFormCoinSuccess));
				} else {
					var fuseResults = fuseHelper(enteredCoin);
					dispatch(getSearchResults(fuseResults));
					dispatch(setFormBool(false));
				}
			}, 3000);
		},
		clickACoin: e => {
			const coin = e.target.getAttribute("data");
			const url = `https://api.coinmarketcap.com/v1/ticker/${coin}/`;
			dispatch(clearSearchResults());
			dispatch(setSelectedCoin(coin));
			dispatch(setFormBool(true));
			dispatch(_request(url, getFormCoinSuccess));
		},
		dispatchOnLoad: () => {
			dispatch(clearSearchResults());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);
