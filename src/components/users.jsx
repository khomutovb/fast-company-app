import React, { useState } from 'react'
import api from '../api/'
import * as extraFunction from '../utils/extraFunction'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        let key = users
            .map((item) => item)
            .find((item) => item._id === userId)
        setUsers(users.filter((item) => item._id != key._id))
    }
    const renderPhrase = (number) => {
        return (
            <span className={extraFunction.getBageClasses(number)}>{extraFunction.getBageText(number)}</span>
        )
    }
    return (
        <>
            <h4 className="users-length__info">
                {renderPhrase(users.length)}
            </h4>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.qualities.map((qualitie) => {
                                    return (
                                        <span key={qualitie._id} className={`badge m-2  bg-${qualitie.color}`}>{qualitie.name}</span>
                                    )
                                })}</td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}/5</td>
                                <td><button onClick={() => handleDelete(user._id)} className='btn btn-danger'>delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Users