import React from "react";

import { arrayOfCoinIds } from "./arrayOfCoinIds";
import Fuse from "fuse.js";
var options = {
	shouldSort: true,
	threshold: 0.1,
	location: 0,
	distance: 100,
	maxPatternLength: 2,
	minMatchCharLength: 2
};

export const fuseHelper = data => {
	var fuse = new Fuse(arrayOfCoinIds, options);
	var result = fuse.search(data).slice(0, 8);
	var arrayOfResults = result.map(indeces => arrayOfCoinIds[indeces]);
	if (arrayOfResults.length === 0) {
		arrayOfResults = ["sorry nothing found"];
	}
	return arrayOfResults;
};

export const capitalizeFirstLetter = string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const paginationConditionals = (coins, getClickedPage) => {
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

	if (coins[0].rank === "1") {
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

export const buildPageUrl = page => {
	if (page < 100) {
		return `https://api.coinmarketcap.com/v1/ticker/`;
	} else {
		return `https://api.coinmarketcap.com/v1/ticker/?start=${page}`;
	}
};
