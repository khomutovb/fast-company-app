import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import { paginate } from '../utils/pagination'
import PropTypes from 'prop-types'
import api from '../api'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UserTable from './userTable'
import _ from 'lodash'
const Users = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const pageSize = 8
    const [users, setUsers] = useState()
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])
    const handleDelete = (userId) => {
        let key = users
            .map((item) => item)
            .find((item) => item._id === userId)
        setUsers(users.filter((item) => item._id !== key._id))
    }
    const handleToggleBookMark = (id) => {
        console.log(id)
        return setUsers(
            users.map((item) => {
                if (item._id === id) {
                    item.bookmark ? item.bookmark = false : item.bookmark = true
                }
                return item
            })
        );
    }

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
        setSortBy(item)
    }
    if (users) {
        const filteredUsersFunc = () => {
            if (professions instanceof Array) {
                return users.filter((user) => _.isEqual(user.profession, selectedProf))
            } else {
                return selectedProf ? users.filter((user) => user.profession === selectedProf) : users
            }
        }
        const filteredUsers = selectedProf ? filteredUsersFunc() : users
        const count = filteredUsers.length
        const cortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const usersCrop = paginate(cortedUsers, currentPage, pageSize)
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
                    <UserTable users={usersCrop} onSort={handleSort} selectedSort={sortBy} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
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
    return (
        <div className="d-flex align-items-center m-2">
            <strong>Loading...</strong>
        </div>
    )
}
Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
}
export default Users