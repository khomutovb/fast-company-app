import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
    onPageChange,
    itemsCount,
    pageSize,
    currentPage,
    onPageChangePrev,
    onPageChangeNext,
}) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pageCount + 1);
    return pageCount > 1 ? (
        <nav aria-label="Page navigation example">
            <ul className="pagination m-1">
                {pages.length > 0 && itemsCount > pageSize && (
                    <li
                        className={
                            "page-item " + (currentPage === 1 ? "disabled" : "")
                        }
                        role="button"
                    >
                        <a
                            className="page-link"
                            aria-label="Previous"
                            onClick={() => onPageChangePrev(currentPage - 1)}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                )}
                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            "page-item " +
                            (page === currentPage ? "active" : "")
                        }
                        role="button"
                    >
                        <a
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
                {pages.length > 0 && itemsCount > pageSize && (
                    <li
                        className={
                            "page-item " +
                            (currentPage === pages.length ? "disabled" : "")
                        }
                        role="button"
                    >
                        <a
                            className="page-link"
                            aria-label="Next"
                            onClick={() =>
                                onPageChangeNext(currentPage + 1, pages.length)
                            }
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    ) : null;
};

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    itemsCount: PropTypes.number,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChangePrev: PropTypes.func,
    onPageChangeNext: PropTypes.func,
};
export default Pagination;
