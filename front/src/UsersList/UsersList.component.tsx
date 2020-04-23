import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { List, CircularProgress } from '@material-ui/core';
import UserItem from './UserItem/UserItem.component';
import { User } from 'common/common.interfaces';
import { fetchUsersList } from 'common/common.queries';
import { UsersListQuery } from './UsersList.interfaces';

const UsersList = (): JSX.Element => {
    const { loading, data = { usersList: [] } } = useQuery<UsersListQuery>(
        fetchUsersList
    );

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <List component="nav">
            {data.usersList.map((user: User) => (
                <UserItem user={user} key={user.id} />
            ))}
        </List>
    );
};

export default UsersList;
