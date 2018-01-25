import React from "react";
import paginationConditionals from "../helpers";
import SearchForm from "./elements/SearchForm";

const Ticker = ({
	coins,
	isFetching,
	searchResults,
	getClickedPage,
	getSearchResults,
	requestSingleCoinData
}) => {
	if (isFetching) {
		return <h1>Loading film...</h1>;
	}

	console.log("coins", coins);

	const coinRows = coins.map(coin => (
		<tr key={coin.symbol}>
			<th scope="row">{coin.rank}</th>
			<td>{coin.name}</td>
			<td>$ {coin.price_usd}</td>
			<td>{coin.price_btc}</td>
			<td>{coin.market_cap_usd}</td>
			<td>% {coin.percent_change_1h}</td>
			<td>% {coin.percent_change_24h}</td>
			<td>% {coin.percent_change_7d}</td>
		</tr>
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
			<SearchForm getSearchResults={getSearchResults} />
			<ul className="list-group">{searchListItems}</ul>
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">Rank</th>
						<th scope="col">Coin</th>
						<th scope="col">Price USD</th>
						<th scope="col">Price BTC</th>
						<th scope="col">Market Cap $</th>
						<th scope="col">% change 1h</th>
						<th scope="col">% change 24h</th>
						<th scope="col">% change 7d</th>
					</tr>
				</thead>
				<tbody>{coinRows ? coinRows : ""}</tbody>
			</table>
		</div>
	);
};

export default Ticker;
