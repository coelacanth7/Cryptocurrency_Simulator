import React, { Component } from "react";
import { connect } from "react-redux";

import { recieveTransactionPage } from "../actions";

class TransactionContainer extends Component {
	componentWillMount() {
		this.props.dispatchOnLoad();
	}

	render() {
		return <h1>TRANSACTION</h1>;
	}
}

const mapStateToProps = state => {
	return {
		transactions: state.transactions,
		cash: state.cash
	};
};

const mapDispatchToProps = dispatch => {
	return {
		dispatchOnLoad: () => {
			dispatch(recieveTransactionPage());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	TransactionContainer
);
