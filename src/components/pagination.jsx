import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({ onPageChange, itemsCount, pageSize, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize)
    if (pageCount === 1 && itemsCount < 0) return null
    console.log({ currentPage })
    const pages = _.range(1, pageCount + 1)
    //[]
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map((page) => (
                    <li key={page} className={'page-item ' + (page === currentPage ? 'active' : '')}>
                        <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
                    </li>
                ))}
            </ul>
        </nav >
    )
}
Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
}
export default Pagination