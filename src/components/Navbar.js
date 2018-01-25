import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light">
			<NavLink activeClassName="active" className="navbar-brand" exact to="/">
				Market
			</NavLink>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavAltMarkup"
				aria-controls="navbarNavAltMarkup"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div className="navbar-nav">
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/trade"
					>
						Trade
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/transactions"
					>
						Transactions
					</NavLink>
					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/portfolio"
					>
						Portfolio
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
