import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import TickerContainer from "../containers/TickerContainer";
import TradeContainer from "../containers/TradeContainer";
import TransactionContainer from "../containers/TransactionContainer";

class App extends Component {
	render() {
		return (
			<Router className="App">
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/" component={TickerContainer} />
						<Route path="/trade" component={TradeContainer} />
						<Route path="/transactions" component={TransactionContainer} />
						<Route path="/portfolio" render={() => <h1>portfolio</h1>} />
						<Route render={() => <h1>Page not found</h1>} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
