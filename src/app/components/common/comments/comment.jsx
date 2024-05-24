import React from "react";

const Comment = ({ comment, onDelete, user }) => {
    const time = new Date(parseInt(comment.created_at));
    const createTime = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
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
                                        {user ? user.name : "неизвестный"}&nbsp;
                                        <span className="small">
                                            {createTime}
                                        </span>
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() => onDelete(comment._id)}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
