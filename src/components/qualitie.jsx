import React from 'react'

const Qualitie = ({ color, name, _id }) => {
    return (
        <span key={_id} className={`badge m-2  bg-${color}`}>{name}</span>
    )
}
export default Qualitie