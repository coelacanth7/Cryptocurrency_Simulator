import React, { Component } from "react";
import { connect } from "react-redux";

import Portfolio from "../components/Portfolio";
import { _request, getPortfolioSuccess, clearPortfolio } from "../actions";

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
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
