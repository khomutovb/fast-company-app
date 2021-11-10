import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualitie from "../../ui/qualities/qualitie";
import { Link } from "react-router-dom";
import CommentsListComponent from "../../common/comments/commentsListComponent";

const UserDetails = ({ id: userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    return (
        <>
            {user ? (
                <div className="container">
                    <div className="row gutters-sm mt-4">
                        <div className="col-md-4 mb-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <Link
                                        to={`/users/${userId}/edit`}
                                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                                    >
                                        <i className="bi bi-gear"></i>
                                    </Link>
                                    <div className="d-flex flex-column align-items-center text-center position-relative">
                                        <img
                                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                                Math.random() + 1
                                            )
                                                .toString(36)
                                                .substring(7)}.svg`}
                                            className="rounded-circle shadow-1-strong me-3"
                                            alt="avatar"
                                            width="150"
                                            height="150"
                                        />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                            <p className="text-secondary mb-1">
                                                {user.profession.name}
                                            </p>
                                            <div className="text-muted">
                                                <i
                                                    className="bi bi-caret-down-fill text-primary"
                                                    role="button"
                                                ></i>
                                                <i
                                                    className="bi bi-caret-up text-secondary"
                                                    role="button"
                                                ></i>
                                                <span className="ms-2">
                                                    {user.rate}/5
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Качества</span>
                                    </h5>
                                    <p className="card-text">
                                        {user.qualities.map((qualitie) => (
                                            <Qualitie
                                                key={qualitie._id}
                                                {...qualitie}
                                            />
                                        ))}
                                    </p>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Количество встреч</span>
                                    </h5>

                                    <h1 className="display-1">
                                        {user.completedMeetings}
                                    </h1>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Избранное</span>
                                    </h5>
                                    <p>
                                        {user.bookmark ? (
                                            <span className="badge bg-success">
                                                Добавлено
                                            </span>
                                        ) : (
                                            <span className="badge bg-danger">
                                                Не добавлено
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <CommentsListComponent userId={userId} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex align-items-center m-2">
                    <strong>Loading...</strong>
                </div>
            )}
        </>
    );
};
UserDetails.propTypes = {
    id: PropTypes.string,
    action: PropTypes.string,
};
export default UserDetails;
