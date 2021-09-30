import React from 'react'
import UsersList from '../components/usersList'
import UserPage from '../components/userPage'
import { useParams } from 'react-router-dom'
const Users = () => {
    const params = useParams()
    const { usersId } = params
    return (
        <>
            {usersId ? (
                <UserPage id={usersId} />
            ) : (<UsersList />)
            }
        </>
    )
}
export default Users