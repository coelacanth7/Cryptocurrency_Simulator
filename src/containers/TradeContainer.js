import React, { Component } from "react";
import { connect } from "react-redux";
import serialize from "form-serialize";

import TradeForm from "../components/TradeForm";
import { makeATrade } from "../actions";

const TradeContainer = ({ coins, cash, makeATrade }) => {
	return <TradeForm coins={coins} cash={cash} makeATrade={makeATrade} />;
};

const mapStateToProps = state => {
	return {
		coins: state.coins,
		cash: state.cash
	};
};

const mapDispatchToProps = dispatch => {
	return {
		makeATrade: () => {
			dispatch(makeATrade());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);
