import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { List, CircularProgress } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import UserItem from './UserItem/UserItem.component';
import { IUser } from 'common/common.interfaces';
import { fetchUsersList } from 'common/common.queries';


interface IQuery {
    usersList: Array<IUser>
}


const useStyles = makeStyles((theme: Theme) =>
    ({
        root: {
            display: 'flex',
            justifyContent: 'center'

        },
        container: {
            maxWidth: 360,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        }
    }),
);

const UsersList = () => {
    const { loading, data = { usersList: [] }} = useQuery<IQuery>(fetchUsersList)
    const classes = useStyles();
    if (loading) {
        return (<div className={classes.root}><CircularProgress /></div>)
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <List component="nav">
                    {data.usersList.map((user: IUser) => (
                        <UserItem user={user}/>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default UsersList;
