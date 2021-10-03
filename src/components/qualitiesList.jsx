import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from "./qualitie";

// нема сенсу мать одночасно QualitiesList та Qualitie - залиш щось одне
// в userPage ти пишеш:
// <p>Качества:
//     {user.qualities.map((qualitie) => (
//       <Qualitie
//         key={qualitie._id}
//         {...qualitie}
//       />
//     ))}
// це ж і є QualitiesList
// QualitiesList можна назвать просто Qualities, бо і так зрозуміло що це список, бо в множені

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qualitie) => (
                <Qualitie
                    key={qualitie._id}
                    {...qualitie}
                />
            ))}
        </>
    )
}
QualitiesList.propTypes = {
    // qualities: PropTypes.array - у випадку масивів краще юзать arrayOf якщо знаєш масив чого в тебе
    qualities: PropTypes.arrayOf(PropTypes.string),
}
export default QualitiesList
