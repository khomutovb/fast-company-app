import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Pagination from './pagination'
import { paginate } from '../utils/pagination'
import PropTypes from 'prop-types'
import api from '../api'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UserTable from './userTable'

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const [users, setUsers] = useState()

    const pageSize = 8

    useEffect(() => {
        // однакові useEffect, тому не треба розділять їх
        // цей useEffect відпрацьовує як звичайний componentDidMount
        api.users.fetchAll().then((data) => setUsers(data))
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    useEffect(() => {
        // цей окремо бо є deps - [selectedProf]
        setCurrentPage(1)
    }, [selectedProf])

    const handleDelete = (userId) => {
        let key = users
            .map((item) => item) // цікавий мап)) що він робе?)
            .find(({ _id }) => _id === userId) // го деструктуризацію
        setUsers(users.filter(({ _id }) => _id !== key._id))

        // будь ласка обдумай що ти тут робиш
        // спробуй подумать і переписать, адже куча лишніх дій тут (якщо що обговорим - пиши)
    }

    const handleToggleBookMark = (id) => {
        console.log(id)
        return setUsers(
            users.map((item) => item._id === id ? {
                ...item,
                  bookmark: !item.bookmark,
              } : item
                // через тернарний буде елегантніше
                // if (item._id === id) {
                //     item.bookmark ? item.bookmark = false : item.bookmark = true // ти тут присваюєш протилежне зрачення, то юзай просто !item.bookmark
                // }
                // return item
            )
        );
    }

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
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onToggleBookMark: PropTypes.func,
}
export default Users
