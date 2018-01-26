import React from "react";

const TradeForm = ({ coins, makeATrade, cash }) => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-8">
					<form>
						<div className="form-group">
							<label htmlFor="coinInput">Coin:</label>
							<input
								type="text"
								id="coinInput"
								className="form-control"
								placeholder="bitcoin"
							/>
						</div>
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
				</div>
			</div>
		</div>
	);
};

export default TradeForm;
