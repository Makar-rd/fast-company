import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState();
    console.log("users", users);
    useEffect(() => {
        // const fetchData = async () => {
        //     const fetchedUsers = await api.users.fetchAll();
        //     setUsers(fetchedUsers);
        // };
        // fetchData();
        api.users.fetchAll().then(data => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        console.log("App_handleDelete", userId);
        setUsers(users.filter((user) => user._id !== userId));
        // setUsers(prevUsers => prevUsers.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        console.log("App_handleToggleBookMark", id);
        setUsers(
            users.map((user) => {
                console.log("user", user);
                if (user._id === id) {
                    console.log("id", id);
                    // user.bookmark = !user.bookmark;
                    // return user;
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    return (
        <div>
            {users && (<Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />)}

        </div>
    );
}

export default App;
