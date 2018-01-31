import React from "react";
import PortfolioRow from "./elements/PortfolioRow";
import { moneyFormatter } from "../helpers";

const Portfolio = ({ transactions, portfolio, tradeCoinOnclick }) => {
	const portfolioRows = portfolio.map((portfolio, index) => (
		<PortfolioRow
			key={index}
			portfolio={portfolio}
			tradeCoinOnclick={tradeCoinOnclick}
		/>
	));

	console.log("portfolio", portfolio);
	let costBasis = 0;
	let currentValue = 0;
	let profitOrLoss = 0;
	portfolio.forEach(item => {
		costBasis += Number(item.costBasis);
		currentValue += Number(item.currentPrice);
		profitOrLoss += item.profitOrLoss;
	});

	return (
		<div>
			<table className="table table-hover mb-5">
				<thead>
					<tr>
						<th scope="col">Cost Basis</th>
						<th scope="col">Current Value</th>
						<th scope="col">Profit or Loss</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{moneyFormatter(costBasis)}</td>
						<td>{moneyFormatter(currentValue)}</td>
						<td>{moneyFormatter(profitOrLoss)}</td>
					</tr>
				</tbody>
			</table>
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
				<tbody>{portfolioRows ? portfolioRows : ""}</tbody>
			</table>
		</div>
	);
};

export default Portfolio;
