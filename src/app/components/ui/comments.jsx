import React, { useState, useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import api from "../../api";

const Comments = () => {
    const [comments, setComments] = useState([]);
    // const [users, setUsers] = useState([]);

    useEffect(() => {
        api.comments.fetchAll().then((comments) => {
            setComments(comments);
            console.log(comments);
        });
        // api.users.getById(comments.userId).then((users) => {
        //     setUsers(users);
        // });
    }, []);

    const handleDelete = (commentId) => {
        api.comments.remove(commentId).then(() => {
            setComments((prevComments) =>
                prevComments.filter((comment) => comment._id !== commentId)
            );
        });
    };

    const handleAddComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    return (
        <div>
            <div className="card mb-2">
                <div className="card-body">
                    {/* Add comment */}
                    <AddCommentForm onAddComment={handleAddComment} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    {/* Comments */}
                    <CommentsList
                        comments={comments}
                        onDelete={handleDelete}
                        // userId={users}
                    />
                </div>
            </div>
        </div>
    );
};

export default Comments;
