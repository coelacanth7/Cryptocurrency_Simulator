import React from "react";
import { paginationConditionals } from "../helpers";
import SearchForm from "./elements/SearchForm";
import CoinRow from "./elements/CoinRow";
import Spinner from "./elements/Spinner";

const Ticker = ({
	coins,
	isFetching,
	searchResults,
	getClickedPage,
	getSearchResults,
	requestSingleCoinData,
	clearSearchResults,
	tradeCoinOnclick
}) => {
	if (isFetching) {
		return <Spinner />;
	}

	console.log("coins", coins);

	const coinRows = coins.map(coin => (
		<CoinRow onClick={tradeCoinOnclick} key={coin.symbol} coin={coin} />
	));

	let pagination = "";
	if (coins.length) {
		pagination = paginationConditionals(coins, getClickedPage);
	}

	let searchListItems = "";
	if (searchResults.length) {
		searchListItems = searchResults.map(coinId => (
			<li
				key={coinId}
				className="list-group-item list-group-item-action"
				data={coinId}
				onClick={requestSingleCoinData}
			>
				{coinId}
			</li>
		));
	}

	return (
		<div>
			<h1>Coins:</h1>
			<div className="row">
				<div className="text-right">
					<nav className="text-right" aria-label="...">
						<ul className="pagination pagination-lg top-paginator">
							{pagination ? pagination.prevPage : ""}
							{pagination ? pagination.nextPage : ""}
						</ul>
					</nav>
				</div>
			</div>
			<SearchForm
				getSearchResults={getSearchResults}
				clearSearchResults={clearSearchResults}
			/>
			<ul className="list-group">{searchListItems}</ul>
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">Rank</th>
						<th scope="col">Coin</th>
						<th scope="col">Price USD</th>
						<th />
						<th scope="col">Price BTC</th>
						<th scope="col">Market Cap $</th>
						<th scope="col">% change 1h</th>
						<th scope="col">% change 24h</th>
						<th scope="col">% change 7d</th>
					</tr>
				</thead>
				<tbody>{coinRows ? coinRows : ""}</tbody>
			</table>
			<div className="row">
				<div className="text-right">
					<nav className="text-right" aria-label="...">
						<ul className="pagination pagination-lg top-paginator">
							{pagination ? pagination.prevPage : ""}
							{pagination ? pagination.nextPage : ""}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Ticker;
