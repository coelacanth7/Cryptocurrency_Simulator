import React, { Component } from "react";
import { connect } from "react-redux";

class TransactionContainer extends Component {
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

export default connect(mapStateToProps)(TransactionContainer);
