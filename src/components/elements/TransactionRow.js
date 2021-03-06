import React from "react";
import { capitalizeFirstLetter, moneyFormatter } from "../../helpers";

const TransactionRow = ({ transaction }) => {
	let coin = capitalizeFirstLetter(transaction.coin);
	var date = new Date(new Date(Number(transaction.date)).getTime())
		.toString()
		.slice(0, 15);

	return (
		<tr>
			<th scope="row">{date}</th>
			<td>{coin}</td>
			<td>{transaction.type.toUpperCase()}</td>
			<td>{moneyFormatter(transaction.usdAmount)}</td>
			<td>{moneyFormatter(transaction.coinPrice)}</td>
			<td>{transaction.coinAmount}</td>
		</tr>
	);
};

export default TransactionRow;
