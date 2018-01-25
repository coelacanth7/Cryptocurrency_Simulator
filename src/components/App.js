import React, { Component } from "react";
import "../App.css";
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Switch
} from "react-router-dom";

class App extends Component {
	render() {
		return (
			<div className="App">
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;
