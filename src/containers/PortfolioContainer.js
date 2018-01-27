import React, { Component } from "react";
import { connect } from "react-redux";

import Portfolio from "../components/Portfolio";
import {
	_request,
	getPortfolioSuccess,
	clearPortfolio,
	setSelectedCoin,
	setFormBool,
	getFormCoinSuccess
} from "../actions";

class PortfolioContainer extends Component {
	componentWillMount() {
		this.props.dispatchOnLoad(this.props.transactions);
	}

	render() {
		return <Portfolio {...this.props} />;
	}
}

const mapStateToProps = state => {
	return {
		transactions: state.transactions,
		portfolio: state.portfolio,
		cash: state.cash
	};
};

const mapDispatchToProps = dispatch => {
	return {
		dispatchOnLoad: transactions => {
			dispatch(clearPortfolio());
			transactions.forEach(transaction => {
				let url = `https://api.coinmarketcap.com/v1/ticker/${
					transaction.coin
				}/`;
				dispatch(_request(url, getPortfolioSuccess));
			});
		},

		tradeCoinOnclick: e => {
			const coin = e.target.getAttribute("data");
			const url = `https://api.coinmarketcap.com/v1/ticker/${coin}/`;
			dispatch(setSelectedCoin(coin));
			dispatch(setFormBool(true));
			dispatch(_request(url, getFormCoinSuccess));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
