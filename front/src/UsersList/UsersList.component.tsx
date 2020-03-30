import React, { ComponentType } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

interface IQuery {
    usersList: Array<IUser>
}

interface IUser {
    firstName: string,
    id: number
}

const query = gql`
{
    usersList{
        id
        firstName
    }
}
`;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

const UsersList = (props: any) => {
    const { loading, data = { usersList: [] } } = useQuery<IQuery>(query, {
        pollInterval: 500,
    })
    console.log('data, loading', data, loading)
    const classes = useStyles();
    if (loading) {
        return (<div>Loading...</div>)
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
            <List component="nav">
                {data.usersList.map((user: IUser) => (
                    <div key={user.id}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="http://lorempixel.com/50/50" />
                            </ListItemAvatar>
                            <ListItemText primary={user.firstName} />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
            </div>
        </div>
    )
}

export default UsersList;
