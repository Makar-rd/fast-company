import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        if (!number > 4 && number < 15) return "человек пойдет";
        const lastOne = Number(number.toString().slice(-1));
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека пойдет";
        if (lastOne === 1) return "человек пойдет";
        return "человек пойдет";
    };

    return (
        <h2>
            <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>
                {length > 0
                    ? `${length} ${renderPhrase(
                          length
                      )} с тобой сегодня жахнуть, `
                    : "никто с тобой не жахнет "}
                по чебуреку
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number
};

export default SearchStatus;
