import React, { Component } from "react";
import { connect } from "react-redux";
import serialize from "form-serialize";

import { arrayOfCoinIds } from "../arrayOfCoinIds";
import {
	_request,
	getTickerSuccess,
	getSearchResults,
	clearSearchResults
} from "../actions";
import Ticker from "../components/Ticker";

import Fuse from "fuse.js";
var options = {
	shouldSort: true,
	threshold: 0.1,
	location: 0,
	distance: 100,
	maxPatternLength: 2,
	minMatchCharLength: 2
};

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
		},
		getSearchResults: e => {
			e.preventDefault();
			const form = e.target;
			const data = serialize(form, { hash: true });
			var fuse = new Fuse(arrayOfCoinIds, options);
			var result = fuse.search(data.query).slice(0, 8);
			var arrayOfResults = result.map(indeces => arrayOfCoinIds[indeces]);
			arrayOfResults.length === 0
				? (arrayOfResults = ["sorry no results"])
				: arrayOfResults;
			dispatch(getSearchResults(arrayOfResults));
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
