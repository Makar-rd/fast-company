import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments, onDelete }) => {
    return (
        <div>
            {comments.map((comment) => (
                <Comment key={comment._id} onDelete={onDelete} {...comment} />
            ))}
        </div>
    );
};
CommentsList.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};

export default CommentsList;
