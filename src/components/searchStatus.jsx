import React from 'react'
import * as extraFunction from '../utils/extraFunction'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
    return (
        <h4>
            <span className={extraFunction.getBageClasses(length)}>{extraFunction.getBageText(length)}</span>
        </h4>
    )
}
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired,
}
export default SearchStatus