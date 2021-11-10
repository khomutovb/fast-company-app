import React from "react";
import UsersListPage from "../components/page/userListPage";
import UserDetails from "../components/page/userDetails";
import { useParams } from "react-router-dom";

const Users = () => {
    const params = useParams();
    const { usersId, action } = params;

    return <>{usersId ? <UserDetails id={usersId} action={action} /> : <UsersListPage />}</>;
};

export default Users;

// стилізацію виправив тільки тут, але так же в усіх треба)
// просто так буде в гарном стилі написано, так в більшості проектів пишуть
// отступи між імпортами, самою компонентою і експортом обов'язково!
// + бажано константи от методів типу return також пустою строкою розділять
// також в кінці виразів - ;
