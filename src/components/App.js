import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";

class App extends Component {
	render() {
		return (
			<Router className="App">
				<div>
					<Navbar />

					<Switch>
						<Route exact path="/" render={() => <h1>crypto</h1>} />
						<Route path="/trade" render={() => <h1>trade</h1>} />
						<Route path="/transactions" render={() => <h1>transactions</h1>} />
						<Route path="/portfolio" render={() => <h1>portfolio</h1>} />
						<Route render={() => <h1>Page not found</h1>} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
