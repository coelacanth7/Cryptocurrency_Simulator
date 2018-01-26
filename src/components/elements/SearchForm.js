import React from "react";

const SearchForm = ({ getSearchResults, clearSearchResults }) => {
	return (
		<form onSubmit={getSearchResults}>
			<div className="form-row">
				<div className="col">
					<input
						type="text"
						name="query"
						className="form-control"
						placeholder="search..."
					/>
				</div>
				<div className="col">
					<input
						type="submit"
						value="Search"
						className="form-control btn btn-success"
					/>
				</div>
				<div className="col">
					<input
						type="button"
						className="form-control btn btn-success"
						value="Clear Search"
						onClick={clearSearchResults}
					/>
				</div>
			</div>
		</form>
	);
};

export default SearchForm;
