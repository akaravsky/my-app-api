import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import fetchUsersList from '../queries/fetchUsersList';
import { useHistory } from 'react-router-dom';


interface IQuery {
    usersList: Array<IUser>
}

interface IUser {
    firstName: string,
    id: number
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
    mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
        id,
        firstName
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

    const onDeleteUser = async (id: number) => {
        await deleteUser({ 
            variables: { id }
        });
        refetch();
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <List component="nav">
                    {data.usersList.map((user: IUser) => (
                        <div key={user.id}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="http://lorempixel.com/50/50" onClick={() => { onDeleteUser(user.id) }} />
                                </ListItemAvatar>
                                <ListItemText primary={user.firstName} onClick={()=> {history.push(`/users/${user.id}`)}}/>
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
