import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { List, CircularProgress } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import UserItem from './UserItem/UserItem.component';
import { User } from 'common/common.interfaces';
import { fetchUsersList } from 'common/common.queries';

interface Query {
    usersList: Array<User>;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        maxWidth: 360,
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
}));

const UsersList = (): JSX.Element => {
    const { loading, data = { usersList: [] } } = useQuery<Query>(
        fetchUsersList
    );
    const classes = useStyles();
    if (loading) {
        return (
            <div className={classes.root}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <List component="nav">
                    {data.usersList.map((user: User) => (
                        <UserItem user={user} key={user.id} />
                    ))}
                </List>
            </div>
        </div>
    );
};

export default UsersList;
