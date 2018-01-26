import React from "react";

const TradeForm = ({
	formCoin,
	makeATrade,
	cash,
	validateCoin,
	searchResults,
	clickACoin,
	selectedCoin,
	formBool,
	formBoolMessage,
	changeAmount,
	amount
}) => {
	let searchListItems = "";
	if (searchResults.length) {
		searchListItems = searchResults.map(coinId => (
			<li
				key={coinId}
				className="list-group-item list-group-item-action"
				data={coinId}
				onClick={clickACoin}
			>
				{coinId}
			</li>
		));
	}

	let coinNotFound = "";
	if (searchResults.length) {
		coinNotFound = <li>That coin is not found try one of these:</li>;
	}

	let price = "";
	if (Object.keys(formCoin).length) {
		let inputValue = `${formCoin.name} $${formCoin.price_usd}`;
		price = (
			<div className="form-group">
				<label>Coin price:</label>
				<input
					type="text"
					value={Number(formCoin.price_usd)}
					className="form-control"
					name="price"
					disabled
				/>
			</div>
		);
	}

	let coinAmount = "";
	if (Object.keys(formCoin).length && amount) {
		let inputValue = amount / Number(formCoin.price_usd);
		coinAmount = (
			<div className="form-group">
				<label>Coin amount:</label>
				<input
					type="text"
					value={inputValue}
					className="form-control"
					name="amount"
					disabled
				/>
			</div>
		);
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-8">
					<form onSubmit={makeATrade}>
						<div className="form-group">
							<label htmlFor="coinInput">Coin:</label>
							<input
								onChange={validateCoin}
								type="text"
								id="coinInput"
								className="form-control"
								placeholder="bitcoin"
								name="coin"
								value={selectedCoin}
							/>
						</div>
						<ul className="list-group">
							{coinNotFound}
							{searchListItems}
						</ul>
						<div className="form-group">
							<label htmlFor="buysellselect">BUY / SELL</label>
							<select id="buysellselect" className="form-control" name="type">
								<option defaultValue value="buy">
									BUY
								</option>
								<option value="sell">SELL</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="cashToInvest">Cash amount:</label>
							<input
								type="number"
								id="cashToInvest"
								className="form-control"
								placeholder="1000"
								name="amount"
								value={amount ? amount : ""}
								onChange={changeAmount}
							/>
						</div>
						<input type="hidden" value={Date.now()} name="date" />
						{price}
						{coinAmount}
						<button
							type="submit"
							className="btn btn-secondary btn-lg btn-block"
						>
							MAKE TRANSACTION
						</button>
					</form>
				</div>
				<div className="col-md-4">
					<h3>Cash Available:</h3>
					<h4>$ {cash.toLocaleString()}</h4>
					<h1>{formBool.toString()}</h1>
					{formBoolMessage}
				</div>
			</div>
		</div>
	);
};

export default TradeForm;
