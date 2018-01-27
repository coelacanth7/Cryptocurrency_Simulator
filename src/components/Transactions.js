import React from "react";
import TransactionRow from "./elements/TransactionRow";

const Transactions = ({ transactions, cash }) => {
	if (!transactions.length) {
		return <h1>No Transactions yet</h1>;
	}

	const transactionsRows = transactions.map(transaction => (
		<TransactionRow key={transaction.date} transaction={transaction} />
	));

	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th scope="col">Date</th>
					<th scope="col">Coin</th>
					<th scope="col">Type</th>
					<th scope="col">usdAmount</th>
					<th scope="col">coinPrice</th>
					<th scope="col">coinAmount</th>
				</tr>
			</thead>
			<tbody>
				{transactionsRows ? transactionsRows : ""}
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

export default Transactions;
