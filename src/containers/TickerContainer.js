import React, { Component } from "react";
import { connect } from "react-redux";

import { _request, getTickerSuccess } from "../actions";
import Ticker from "../components/Ticker";

class TickerContainer extends Component {
	componentWillMount() {
		this.props.requestTickerData();
	}

	render() {
		const { coins, isFetching, getClickedPage } = this.props;
		return (
			<Ticker
				coins={coins}
				isFetching={isFetching}
				getClickedPage={getClickedPage}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		coins: state.coins,
		isFetching: state.isFetching
	};
};

const buildPageUrl = page => {
	if (page < 100) {
		return `https://api.coinmarketcap.com/v1/ticker/`;
	} else {
		return `https://api.coinmarketcap.com/v1/ticker/?start=${page}`;
	}
};

const mapDispatchToProps = dispatch => {
	return {
		requestTickerData: () => {
			dispatch(
				_request(`https://api.coinmarketcap.com/v1/ticker/`, getTickerSuccess)
			);
		},
		getClickedPage: e => {
			e.preventDefault();
			const page = e.target.name;
			const url = buildPageUrl(page);
			console.log("page", page);
			console.log("url", url);
			dispatch(_request(url, getTickerSuccess));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TickerContainer);
