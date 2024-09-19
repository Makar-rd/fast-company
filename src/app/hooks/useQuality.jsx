import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import QualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualitys, setQualitys] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        async function getQualitysList() {
            try {
                const { content } = await QualityService.get();
                // console.log("контент 36 стр", content);
                setQualitys(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        }
        getQualitysList();
    }, []);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getQuality(id) {
        return qualitys.find((p) => p._id === id);
    }

    return (
        <QualityContext.Provider value={{ isLoading, qualitys, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
