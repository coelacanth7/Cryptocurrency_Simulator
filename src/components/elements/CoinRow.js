import React from "react";
import { NavLink } from "react-router-dom";
import { moneyFormatter } from "../../helpers";

const CoinRow = ({ coin, onClick }) => (
	<tr>
		<th scope="row">{coin.rank}</th>
		<td>{coin.name}</td>
		<td>{moneyFormatter(coin.price_usd)}</td>
		<td>
			<NavLink exact to="/trade" data={coin.id} onClick={onClick}>
				Trade
			</NavLink>
		</td>
		<td>{coin.price_btc}</td>
		<td>{moneyFormatter(coin.market_cap_usd)}</td>
		<td style={{ color: coin.color_1h }}>% {coin.percent_change_1h}</td>
		<td style={{ color: coin.color_24h }}>% {coin.percent_change_24h}</td>
		<td style={{ color: coin.color_7d }}>% {coin.percent_change_7d}</td>
	</tr>
);

export default CoinRow;
