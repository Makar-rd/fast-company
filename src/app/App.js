import React, {useState} from "react";
import SearchStatus from "./components/searchStatus"
import Users from "./components/users";
import api from "./api"


function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
console.log('user',users)
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    };
    const handleToggleBookMark = (id) => {
        setUsers(users.map((el)=> {
          if (el._id === id) {
            console.log('true')
            return {...el, bookmark: !el.bookmark}

          } return el
          
        }))
    }

    return (
        <>
            <SearchStatus  length={users.length}/>
            <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark}/>
        </>
    )
}

export default App