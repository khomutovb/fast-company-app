import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import { paginate } from '../utils/pagination'
import PropTypes from 'prop-types'
import api from '../api'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UserTable from './userTable'
import _ from 'lodash'
const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
    const pageSize = 8
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const handleProfessionsSelect = (items) => {
        setSelectedProf(items)
    }
    const handlePageChangePrev = (prevIndex) => {
        if (prevIndex > 0) {
            setCurrentPage(prevIndex)
        }
    }
    const handlePageChangeNext = (nextIndex, indexLength) => {
        if (nextIndex <= indexLength) {
            setCurrentPage(nextIndex)
        }
    }
    const handleSort = (item) => {
        setSortBy({ iter: item, order: 'asc' })
    }
    const filteredUsersFunc = () => {
        if (professions instanceof Array) {
            return allUsers.filter((user) => _.isEqual(user.profession, selectedProf))
        } else {
            return selectedProf ? allUsers.filter((user) => user.profession === selectedProf) : allUsers
        }
    }
    const filteredUsers = selectedProf ? filteredUsersFunc() : allUsers
    const count = filteredUsers.length
    const cortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
    const users = paginate(cortedUsers, currentPage, pageSize)
    const clearFilter = () => {
        setSelectedProf(undefined)
    }
    return (
        <React.Fragment>
            <SearchStatus length={count} />
            {professions &&
                <div className="d-flex flex-wrap">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionsSelect}
                        derictionProperty='list-group-horizontal flex-wrap'
                    />
                    <button className="btn btn-danger m-1" onClick={clearFilter}>Сброс</button>
                </div>
            }
            <div className="table-responsive">
                <UserTable users={users} onSort={handleSort} {...rest} />
            </div>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onPageChangePrev={handlePageChangePrev}
                onPageChangeNext={handlePageChangeNext}
            />
        </React.Fragment>
    )
}
Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
}
export default Users