import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { calculateDate } from "../../../utils/date";

const Comment = ({ userId, content, date, commentId, handleDeleteComment }) => {
    const [user, setUser] = useState();
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        api.users.getById(userId).then((response) => setUser(response));
        setAvatar(
            `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`
        );
    }, []);

    return user ? (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={avatar}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user.name}
                                        <span className="small">{" - "}</span>
                                        {calculateDate(date)}
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() =>
                                            handleDeleteComment(commentId)
                                        }
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

Comment.propTypes = {
    userId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    commentId: PropTypes.string.isRequired,
    handleDeleteComment: PropTypes.func.isRequired,
};

export default Comment;
