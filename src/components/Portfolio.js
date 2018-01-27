import React from "react";
import PortfolioRow from "./elements/PortfolioRow";

const Portfolio = ({ transactions, portfolio, tradeCoinOnclick }) => {
	const portfolioRows = portfolio.map(portfolio => (
		<PortfolioRow
			key={portfolio.coin}
			portfolio={portfolio}
			tradeCoinOnclick={tradeCoinOnclick}
		/>
	));

	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th scope="col">Coin</th>
					<th scope="col">Quantity</th>
					<th scope="col">Cost Basis</th>
					<th scope="col">Current Price</th>
					<th scope="col">Current Value</th>
					<th scope="col">Profit / Loss</th>
					<th scope="col">Trade</th>
				</tr>
			</thead>
			<tbody>
				{portfolioRows ? portfolioRows : ""}
				<tr>
					<th scope="row" />
					<td> </td>
					<td />
					<td />
					<td />
					<td />
				</tr>
				<tr>
					<th scope="row" />
					<td />
					<td />
					<td />
					<td />
					<td />
				</tr>
				<tr>
					<th scope="row" />
					<td />
					<td />
					<td />
					<td />
					<td />
				</tr>
			</tbody>
		</table>
	);
};

export default Portfolio;
