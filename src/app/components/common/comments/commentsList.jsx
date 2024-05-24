import React, { useState, useEffect } from "react";
import Comment from "./comment";
import api from "../../../api";

const CommentsList = ({ comments, onDelete }) => {
    const [users, setUsers] = useState({});

    useEffect(() => {
        const userIds = comments.map((comment) => comment.userId);

        userIds.forEach((userId) => {
            api.users.getById(userId).then((user) => {
                setUsers((prevUsers) => ({
                    ...prevUsers,
                    [userId]: user
                }));
            });
        });
    }, [comments]);

    return (
        <div>
            {comments.map((comment) => (
                <Comment
                    key={comment._id}
                    comment={comment}
                    onDelete={onDelete}
                    user={users[comment.userId]}
                />
            ))}
        </div>
    );
};

export default CommentsList;
