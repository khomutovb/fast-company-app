import React, { useState } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import Qualitie from './qualitie'
import { useHistory } from 'react-router-dom'
const UserPage = ({ id }) => {
    const userId = id
    const history = useHistory()
    const [user, setUser] = useState()
    api.users.getById(userId).then((data) => setUser(data))
    const handleSave = () => {
        history.push("/users")
    }
    return (
        <>
            {user ? (
                <div className="user-info m-2">
                    <p>Имя: <strong>{user.name}</strong></p>
                    <p>Профессия: <strong>{user.profession.name}</strong></p>
                    <p>Качества:
                        {user.qualities.map((qualitie) => (
                        <Qualitie
                            key={qualitie._id}
                            {...qualitie}
                        />
                    ))}
                    </p>
                    <p>Встреч: <strong>{user.completedMeetings}</strong></p>
                    <p>Рейтинг: <strong>{user.rate}/5</strong></p>
                    <p>Избранное: {user.bookmark ? <span className="badge bg-success">Добавлено</span> : <span className="badge bg-danger">Не добавлено</span>}</p>
                    <button onClick={() => { handleSave() }} className="btn btn-primary">Все пользователи</button>
                </div>
            ) : (
                    <div className="d-flex align-items-center m-2">
                        <strong>Loading...</strong>
                    </div>
                )
            }
        </>
    )
}
UserPage.propTypes = {
    id: PropTypes.string,
}
export default UserPage