import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        api.users
            .getById(userId)
            .then((data) => {
                setUser(data);
            })
            .catch(() => {
                history.push(`/userNotFound/${userId}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return "Loading...";
    }

    if (!user) {
        return (
            <div className="alert alert-danger" role="alert">
                {`${userId} Not found`}
            </div>
        );
    }

    // const handleEdit = () => {
    //     history.push(`/users/${userId}/edit`);
    // };
    // console.log("userPage", user);
    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard user={user} />
                    <MeetingsCard user={user} />
                </div>

                <div className="col-md-8">
                    <Comments />
                </div>
            </div>
        </div>

        // <div className="container mt-5">
        //     <div className="card">
        //         <div className="card-body">
        //             <h2 className="card-title">{user.name}</h2>
        //             <p className="card-text">Email: {user.email}</p>
        //             <p className="card-text">Пол: {user.sex}</p>
        //             <p className="card-text">
        //                 Профессия: {user.profession.name}
        //             </p>
        //             <p className="card-text">Качества:</p>
        //             <ul className="list-group">
        //                 {user.qualities.map((quality) => (
        //                     <li key={quality._id} className="list-group-item">
        //                         {quality.name}
        //                     </li>
        //                 ))}
        //             </ul>
        //             <p className="card-text">
        //                 Встречался, раз: {user.completedMeetings}
        //             </p>
        //             <p className="card-text">Оценка: {user.rate}</p>
        //             <button
        //                 type="button"
        //                 className="btn btn-warning"
        //                 onClick={handleEdit}
        //             >
        //                 Изменить
        //             </button>
        //         </div>
        //     </div>
        // </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
