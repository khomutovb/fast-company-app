import React from 'react'
import * as extraFunction from '../utils/extraFunction'

const SearchStatus = ({ length }) => {
    return (
        <h4>
            <span className={extraFunction.getBageClasses(length)}>{extraFunction.getBageText(length)}</span>
        </h4>
    )
}
export default SearchStatus