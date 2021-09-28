import React from 'react'
import Qualitie from './qualitie'
import Bookmark from './bookmark'
import PropTypes from 'prop-types'

const User = ({ _id, name, qualities, profession, completedMeetings, rate, onDelete, onToggleBookMark, bookmark }) => {
    return (
        <tr key={_id}>
            <td>{name}</td>
            <td>
                {
                    
                }
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <Bookmark status={bookmark} onToggleBookMark={onToggleBookMark} _id={_id} />
            </td>
            <td><button onClick={() => onDelete(_id)} className='btn btn-danger'>delete</button></td>
        </tr>
    )
}
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    bookmark: PropTypes.bool,
}
export default User