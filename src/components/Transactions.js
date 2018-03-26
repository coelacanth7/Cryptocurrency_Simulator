import React from "react";
import TransactionRow from "./elements/TransactionRow";

const Transactions = ({ transactions }) => {
	if (!transactions.length) {
		return <h1>No Transactions yet</h1>;
	}

	const transactionsRows = transactions.map(transaction => (
		<TransactionRow key={transaction.date} transaction={transaction} />
	));

	return (
		<div className="table-responsive">
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
				<tbody>{transactionsRows ? transactionsRows : ""}</tbody>
			</table>
		</div>
	);
};

export default Transactions;
