import React, { useState, useEffect } from "react";
import _ from "lodash";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/pagination";
import PropTypes from "prop-types";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/userTable";
import Search from "../../common/form/search";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchName, setSearchName] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState([]);

    const pageSize = 8;
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem("users", JSON.stringify(users));
        }
    }, [users]);

    const handleDelete = (userId) => {
        setUsers(users.filter(({ _id }) => _id !== userId));
    };
    const handleToggleBookMark = (id) => {
        return setUsers(
            users.map((item) =>
                item._id === id
                    ? {
                          ...item,
                          bookmark: !item.bookmark,
                      }
                    : item
            )
        );
    };

    const handleChange = ({ target }) => {
        setSearchName(target.value);
        setSelectedProf(undefined);
    };
    const handleProfessionsSelect = (items) => {
        setSelectedProf(items);
        setSearchName("");
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handlePageChangePrev = (prevIndex) => {
        if (prevIndex > 0) {
            setCurrentPage(prevIndex);
        }
    };
    const handlePageChangeNext = (nextIndex, indexLength) => {
        if (nextIndex <= indexLength) {
            setCurrentPage(nextIndex);
        }
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const filteredUsersFunc = () => {
        if (selectedProf) {
            return users.filter((user) =>
                _.isEqual(user.profession, selectedProf)
            );
        }
        if (searchName) {
            let searchRegExp = new RegExp(`${searchName}`, "g");
            return users.filter(
                (user) =>
                    searchRegExp.test(user.name.toLowerCase()) ||
                    searchRegExp.test(user.name)
            );
        }
        return users;
    };
    const filteredUsers = filteredUsersFunc();
    const count = filteredUsers.length;
    const cortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(cortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf(undefined);
    };
    return users.length > 0 ? (
        <React.Fragment>
            <SearchStatus length={count} />
            <Search value={searchName} handleChange={handleChange} />
            {professions && (
                <div className="d-flex flex-wrap">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionsSelect}
                        derictionProperty="list-group-horizontal flex-wrap"
                    />
                    <button
                        className="btn btn-danger m-1"
                        onClick={clearFilter}
                    >
                        Сброс
                    </button>
                </div>
            )}
            <div className="table-responsive">
                <UserTable
                    users={usersCrop}
                    onSort={handleSort}
                    selectedSort={sortBy}
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                />
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
    ) : (
        <div className="d-flex align-items-center m-2">
            <strong>Loading...</strong>
        </div>
    );
};
UsersListPage.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onToggleBookMark: PropTypes.func,
};
export default UsersListPage;
