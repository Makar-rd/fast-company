import React from "react";
import PropTypes from "prop-types";

const SortIndicator = ({ order }) => {
    return (
        <span>
            {order === "asc" ? (<i className="bi bi-caret-up-fill"></i>) : (<i className="bi bi-caret-down-fill"></i>)}
        </span>
    );
};

SortIndicator.propTypes = {
    order: PropTypes.oneOf(["asc", "desc"]).isRequired
};

export default SortIndicator;
