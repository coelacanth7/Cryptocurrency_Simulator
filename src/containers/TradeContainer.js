import React, { Component } from "react";
import { connect } from "react-redux";
import serialize from "form-serialize";

import TradeForm from "../components/TradeForm";
import {
	makeATrade,
	getSearchResults,
	clearSearchResults,
	_request,
	getTickerSuccess,
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
			coins,
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
				coins={coins}
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
		coins: state.coins,
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
					dispatch(clearSearchResults());
					dispatch(setFormBool(true));
				} else {
					var fuseResults = fuseHelper(enteredCoin);
					dispatch(getSearchResults(fuseResults));
					dispatch(setFormBool(false));
				}
			}, 3000);
			// check if coin array includes coin
			// if not then suggest similar coins
			// make api call to get coins data
		},
		clickACoin: e => {
			const coin = e.target.getAttribute("data");
			dispatch(clearSearchResults());
			dispatch(setSelectedCoin(coin));
			dispatch(setFormBool(true));
		},
		dispatchOnLoad: () => {
			dispatch(clearSearchResults());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);
