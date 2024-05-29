import React, { useState, useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useParams } from "react-router-dom";
import _ from "lodash";
import api from "../../api";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleDelete = (commentId) => {
        api.comments.remove(commentId).then((commentId) => {
            setComments(comments.filter((el) => el._id != commentId));
        });
    };

    const handleAddComment = (newComment) => {
        api.comments
            .add({ ...newComment, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const sortitComments = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <div>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onAddComment={handleAddComment} />
                </div>
            </div>
            {comments.length > 0 && ( // это нужно для того чтоб если нет коментариев, то блока нет!
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortitComments}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;
