import React, { useState, useEffect } from "react";
import api from "../../../api";
import { displayDate } from "../../../utils/displayDate";
import PropTypes from "prop-types";

const Comment = ({
    onDelete,
    userId,
    content,
    created_at: created,
    _id: id
}) => {
    const [users, setUsers] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setUsers(user);
        });
    }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                {isLoading ? (
                    "Loading..."
                ) : (
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://api.dicebear.com/8.x/avataaars/svg/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {users ? users.name : "неизвестный"}
                                            : &nbsp;
                                            <span className="small">
                                                {displayDate(created)}
                                            </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onDelete(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
Comment.propTypes = {
    onDelete: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    _id: PropTypes.string.isRequired
};
export default Comment;
