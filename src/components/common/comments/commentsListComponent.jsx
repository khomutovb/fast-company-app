import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import CommentsForm from "./commentsForm";
import Comment from "./comment";

const CommentsListComponent = ({ userId }) => {
    const [users, setUsers] = useState();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        api.comments.add({
            pageId: userId,
            userId: data.selectedUser,
            content: data.content,
        });
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    };

    const handleDeleteComment = (commentId) => {
        api.comments.remove(commentId);
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    };

    console.log(comments);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <div>
                        <h2>Новый комментарий</h2>
                        <CommentsForm users={users} onSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Комментарии</h2>
                    <hr />
                    {comments &&
                        comments
                            .sort(
                                (a, b) =>
                                    Number(b.created_at) - Number(a.created_at)
                            )
                            .map((comment) => (
                                <Comment
                                    key={comment._id}
                                    commentId={comment._id}
                                    userId={comment.userId}
                                    content={comment.content}
                                    handleDeleteComment={handleDeleteComment}
                                    date={comment.created_at}
                                />
                            ))}
                </div>
            </div>
        </>
    );
};

CommentsListComponent.propTypes = {
    userId: PropTypes.string,
};
export default CommentsListComponent;
