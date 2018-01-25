import React, { Component } from "react";
import { connect } from "react-redux";
import serialize from "form-serialize";

import {
	_request,
	getTickerSuccess,
	getSearchResults,
	clearSearchResults
} from "../actions";
import Ticker from "../components/Ticker";
import { buildPageUrl, fuseHelper } from "../helpers";

class TickerContainer extends Component {
	componentWillMount() {
		this.props.requestTickerData();
	}

	render() {
		const {
			coins,
			isFetching,
			searchResults,
			getClickedPage,
			getSearchResults,
			requestSingleCoinData,
			clearSearchResults
		} = this.props;
		return (
			<Ticker
				coins={coins}
				isFetching={isFetching}
				searchResults={searchResults}
				getClickedPage={getClickedPage}
				getSearchResults={getSearchResults}
				requestSingleCoinData={requestSingleCoinData}
				clearSearchResults={clearSearchResults}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		coins: state.coins,
		searchResults: state.searchResults,
		isFetching: state.isFetching
	};
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
			dispatch(_request(url, getTickerSuccess));
		},
		getSearchResults: e => {
			e.preventDefault();
			const form = e.target;
			const data = serialize(form, { hash: true });
			var fuseResults = fuseHelper(data);
			dispatch(getSearchResults(fuseResults));
		},
		requestSingleCoinData: e => {
			const coin = e.target.getAttribute("data");
			const url = `https://api.coinmarketcap.com/v1/ticker/${coin}/`;
			dispatch(_request(url, getTickerSuccess));
		},
		clearSearchResults: e => {
			e.preventDefault();
			dispatch(clearSearchResults());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TickerContainer);
