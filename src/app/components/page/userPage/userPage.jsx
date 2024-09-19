import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
// import { useHistory } from "react-router-dom";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // const [loading, setLoading] = useState(true);
    // const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then((data) => {
            setUser(data);
            setIsLoading(false);
        });
        // .catch(() => {
        //     history.push(`/userNotFound/${userId}`);
        // })
        // .finally(() => {
        //     setLoading(false);
        // });
    }, []);

    // if (loading) {
    //     return "Loading...";
    // }

    // if (!user) {
    //     return (
    //         <div className="alert alert-danger" role="alert">
    //             {`${userId} Not found`}
    //         </div>
    //     );
    // }

    // const handleEdit = () => {
    //     history.push(`/users/${userId}/edit`);
    // };
    // console.log("userPage", user);
    if (user) {
        return (
            <div className="container">
                {isLoading ? (
                    "Loading..."
                ) : (
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard data={user.qualities} />
                            <MeetingsCard value={user.completedMeetings} />
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
    // return (
    //     <div className="container">
    //         <div className="row gutters-sm">
    //             <div className="col-md-4 mb-3">
    //                 <UserCard user={user} />
    //                 <QualitiesCard data={user.qualities} />
    //                 <MeetingsCard value={user.completedMeetings} />
    //             </div>

    //             <div className="col-md-8">
    //                 <Comments />
    //             </div>
    //         </div>
    //     </div>
    // );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
