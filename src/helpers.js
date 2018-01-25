import React from "react";

const paginationConditionals = (coins, getClickedPage) => {
	var page = {};
	var nextPage = (
		<li className="page-item">
			<a
				className="page-link"
				name={Number(coins[0].rank) + 99}
				onClick={getClickedPage}
			>
				Next Page &raquo;
			</a>
		</li>
	);
	var prevPage = (
		<li className="page-item">
			<a
				className="page-link"
				name={Number(coins[0].rank) - 101}
				onClick={getClickedPage}
			>
				&laquo; Previous Page
			</a>
		</li>
	);

	if (coins[0].rank == 1) {
		page.nextPage = nextPage;
		return page;
	}

	if (coins[0].rank > 99 && coins[0].rank < 1400) {
		page.nextPage = nextPage;
		page.prevPage = prevPage;
		return page;
	}

	if (coins[0].rank > 1400) {
		page.prevPage = prevPage;
		return page;
	}
};

export default paginationConditionals;
