// краще назвать userDetails компонент і файл
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import Qualitie from './qualitie'
import { useHistory } from 'react-router-dom'
const UserDetails = ({ id: userId }) => {
    // const userId = id
    // нема жодного сенсу в новій константі, або юзай id те що прийшло
    // або якщо хочеться userId то прийми в деструктурізації пропсів { id: userId }
    const history = useHistory()
    const [user, setUser] = useState()
    // нижче апі кол і зараз він буде визиватись при кожному рендері
    // це те що ми не можемо допустить, виправ це, будь ласка, сам (якщо що пиши питай)
    useEffect(() => {
        api.users.getById(userId)
            .then((data) => setUser(data))
    }, []);

    const handleSave = () => {
        history.push("/users")
    }
    return (
        <>
            {user ? ( // за тернарні оператори лайк, в таких випадках те що треба
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
                    {
                        // замість () => {handleSave()} просто handleSave
                        //<button onClick={() => {handleSave()}} className="btn btn-primary">Все пользователи</button>
                    }
                    <button onClick={handleSave} className="btn btn-primary">Все пользователи</button>
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
UserDetails.propTypes = {
    id: PropTypes.string,
}
export default UserDetails
