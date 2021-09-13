import React, { useState } from 'react'
import SearchStatus from './components/searchStatus'
import Users from './components/users'
import api from './api/'
function App() {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        let key = users
            .map((item) => item)
            .find((item) => item._id === userId)
        setUsers(users.filter((item) => item._id !== key._id))
    }
    const handleToggleBookMark = (id) => {
        console.log(id)
        return setUsers(
            users.map((item) => {
                if (item._id === id) {
                    item.bookmark ? item.bookmark = false : item.bookmark = true
                }
                return item
            })
        );
    }
    return (
        <React.Fragment>
            <SearchStatus length={users.length} />
            <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
        </React.Fragment>
    );
}
export default App