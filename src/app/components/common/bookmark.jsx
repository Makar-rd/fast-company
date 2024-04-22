import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    return (
        <button
            className={`btn ${status ? "btn-dark" : "btn-primary"}`}
            {...rest}
        >
            <i className={"bi bi-bookmark" + (status ? "-fill" : "")}></i>
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
