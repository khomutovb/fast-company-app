import React from 'react'
// import * as extraFunction from '../utils/extraFunction'   //  приймай сразу функції, а не об'єкт з ними
import { getBageClasses, getBageText } from '../utils/extraFunction' //  якщо їх не дуже багато (менше 5-7)
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
    return (
        <h4>
            <span className={getBageClasses(length)}>{getBageText(length)}</span>
        </h4>
    )
}
SearchStatus.propTypes = {
    length: PropTypes.number,
}
export default SearchStatus
