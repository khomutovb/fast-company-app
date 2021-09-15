import React, { useState, useEffect } from 'react'
import Users from './components/users'
import api from './api/'
function App() {
    const [users, setUsers] = useState()
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])
    const handleDelete = (userId) => {
        let key = users
            .map((item) => item)
            .find((item) => item._id === userId)
        setUsers(users.filter((item) => item._id !== key._id))
    }
    const handleToggleBookMark = (id) => {
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
            {users ? (
                <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
            ) : (
                    <div className="d-flex align-items-center m-2">
                        <strong>Loading...</strong>
                    </div>
                )
            }
        </React.Fragment>
    );
}
export default App