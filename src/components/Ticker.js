import React from "react";

const Ticker = ({ coins, isFetching }) => {
	if (isFetching) {
		return <h1>Loading film...</h1>;
	}

	console.log("coins", coins);

	let coinRows = "";

	if (coins) {
		coinRows = coins.map(coin => (
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
	}

	return (
		<div>
			<h1>Coins:</h1>
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
