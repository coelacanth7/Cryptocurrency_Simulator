import React from "react";
import { Redirect } from "react-router";

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
	validateAmount,
	amount,
	formSubmitRedirect,
	onChangeBuySell,
	buySell,
	myCoins
}) => {
	let coinNotFound = "";
	if (searchResults.length) {
		coinNotFound = <li>That coin is not found try one of these:</li>;
	}

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

	const { from } = "/";

	const listGroupOfCoins = myCoins.map(myCoin => (
		<li className="list-group-item" key={myCoin.coin}>
			{myCoin.coin}: {myCoin.coinAmount}
		</li>
	));

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
							<select
								className="form-control"
								name="type"
								onChange={onChangeBuySell}
								value={buySell}
							>
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
								onChange={validateAmount}
							/>
						</div>
						<div className="form-group">
							<label htlmfor="coinPriceInput">Coin price:</label>
							<input
								type="number"
								value={formCoin.price_usd ? formCoin.price_usd : 0}
								className="form-control"
								name="price"
								id="coinPriceInput"
								onChange={validateCoin}
								readOnly="readOnly"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="coinAmount">Coin amount:</label>
							<input
								type="number"
								value={
									formCoin.price_usd ? amount / Number(formCoin.price_usd) : 0
								}
								className="form-control"
								onChange={validateCoin}
								name="coinAmount"
								id="coinAmount"
								readOnly="readOnly"
							/>
						</div>
						<input type="hidden" value={Date.now()} name="date" />

						{formBool &&
							selectedCoin && (
								<input
									type="submit"
									className="btn btn-secondary btn-lg btn-block"
									value="MAKE TRANSACTION"
								/>
							)}

						{formSubmitRedirect && <Redirect to={from || "/transactions"} />}
					</form>
				</div>
				<div className="col-md-4 border">
					<h3>Cash Available</h3>
					<h4>$ {cash.toLocaleString()}</h4>
					<h1>{formBool && selectedCoin.length ? "Valid" : "Invalid"}</h1>
					{formBoolMessage}
					<ul className="list-group">
						<li className="list-group-item">Current Coins</li>
						{listGroupOfCoins}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TradeForm;
