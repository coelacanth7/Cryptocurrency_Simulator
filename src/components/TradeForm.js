import React from "react";

const TradeForm = ({
	coins,
	makeATrade,
	cash,
	validateCoin,
	searchResults,
	clickACoin,
	selectedCoin,
	formBool
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

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-8">
					<form>
						<div className="form-group">
							<label htmlFor="coinInput">Coin:</label>

							<input
								onChange={validateCoin}
								type="text"
								id="coinInput"
								className="form-control"
								placeholder="bitcoin"
								name="enteredCoin"
								value={selectedCoin}
							/>
						</div>
						<ul className="list-group">
							{coinNotFound}
							{searchListItems}
						</ul>
						<div className="form-group">
							<label htmlFor="buysellselect">BUY / SELL</label>
							<select id="buysellselect" className="form-control">
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
							/>
						</div>
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
				</div>
			</div>
		</div>
	);
};

export default TradeForm;
