import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, IconButton, ListItemSecondaryAction, Badge } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import fetchUsersList from './queries/fetchUsersList';
import { useHistory } from 'react-router-dom';


interface IQuery {
    usersList: Array<IUser>
}

interface IUser {
    name: string,
    id: string
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

const mutation = gql`
    mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
        id,
        name
    }
}
`;

const UsersList = (props: any) => {
    const history = useHistory();
    const [deleteUser, { data: deletedData }] = useMutation(mutation);
    const { loading, data = { usersList: [] }, refetch } = useQuery<IQuery>(fetchUsersList/*, {
        pollInterval: 500,
    }*/)
    const classes = useStyles();
    if (loading) {
        return (<div>Loading...</div>)
    }

    const onDeleteUser = async (id: string) => {
        await deleteUser({
            variables: { id }
        });
        refetch();
    }
    console.log(data)
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <List component="nav">
                    {data.usersList.map((user: IUser) => (
                        <div key={user.id}>
                            <ListItem button onClick={() => { history.push(`/users/${user.id}`) }}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="http://lorempixel.com/50/50" />
                                </ListItemAvatar>
                                <ListItemText primary={user.name} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="like" onClick={() => { }}>
                                        <Badge
                                            badgeContent={4}
                                            color="secondary"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}>
                                            <ThumbUpIcon />
                                        </Badge>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => { onDeleteUser(user.id) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
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
