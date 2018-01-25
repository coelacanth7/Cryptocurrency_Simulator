import React, { Component } from "react";
import { connect } from "react-redux";

import { _request, getTickerSuccess } from "../actions";
import Ticker from "../components/Ticker";

class TickerContainer extends Component {
	componentWillMount() {
		this.props.requestTickerData();
	}

	render() {
		const { coins, isFetching } = this.props;
		return <Ticker coins={coins} isFetching={isFetching} />;
	}
}

const mapStateToProps = state => {
	return {
		coins: state.coins,
		isFetching: state.isFetching
	};
};

const mapDispatchToProps = dispatch => {
	return {
		requestTickerData: () => {
			dispatch(
				_request(`https://api.coinmarketcap.com/v1/ticker/`, getTickerSuccess)
			);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TickerContainer);
