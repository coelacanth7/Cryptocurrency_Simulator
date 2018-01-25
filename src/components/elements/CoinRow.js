import React from "react";

const CoinRow = ({ coin }) => (
	<tr>
		<th scope="row">{coin.rank}</th>
		<td>{coin.name}</td>
		<td>$ {coin.price_usd}</td>
		<td>{coin.price_btc}</td>
		<td>{coin.market_cap_usd}</td>
		<td>% {coin.percent_change_1h}</td>
		<td>% {coin.percent_change_24h}</td>
		<td>% {coin.percent_change_7d}</td>
	</tr>
);

export default CoinRow;
