import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleChange, value }) => {
    return (
        <div className="search-container m-1">
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="form-control"
                    type="search"
                    value={value}
                    onChange={handleChange}
                    placeholder="Search..."
                />
            </form>
        </div>
    );
};

Search.propTypes = {
    handleChange: PropTypes.func,
    value: PropTypes.string,
};
export default Search;
