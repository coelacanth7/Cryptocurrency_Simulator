import React from "react";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter, moneyFormatter } from "../../helpers";

const PortfolioRow = ({ portfolio, tradeCoinOnclick }) => {
	return (
		<tr>
			<th scope="row">{capitalizeFirstLetter(portfolio.coin)}</th>
			<td>{portfolio.quantity}</td>
			<td>{moneyFormatter(portfolio.costBasis)}</td>
			<td>{moneyFormatter(portfolio.currentPrice)}</td>
			<td>{moneyFormatter(portfolio.currentValue)}</td>
			<td>{moneyFormatter(portfolio.profitOrLoss)}</td>
			<td>
				<NavLink
					exact
					to="/trade"
					data={portfolio.coin}
					onClick={tradeCoinOnclick}
				>
					Trade
				</NavLink>
			</td>
		</tr>
	);
};

export default PortfolioRow;
