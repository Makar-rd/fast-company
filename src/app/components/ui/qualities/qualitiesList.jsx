import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    // console.log(qualities);
    const { isLoading } = useQuality();
    if (isLoading) {
        return "Loading...";
    }
    return (
        <>
            {qualities.map((quality) => (
                <Qualitie key={quality} id={quality} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
