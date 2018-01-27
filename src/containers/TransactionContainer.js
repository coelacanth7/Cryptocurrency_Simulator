import React, { Component } from "react";
import { connect } from "react-redux";

import { recieveTransactionPage } from "../actions";
import Transactions from "../components/Transactions";

class TransactionContainer extends Component {
	componentWillMount() {
		this.props.dispatchOnLoad();
	}

	render() {
		return <Transactions {...this.props} />;
	}
}

const mapStateToProps = state => {
	return {
		transactions: state.transactions
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
