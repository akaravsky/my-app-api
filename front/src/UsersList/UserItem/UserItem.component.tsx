import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    IconButton,
    ListItemSecondaryAction,
    Badge
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import {
    mutationForDeleteUser,
    mutationForAddLike
} from './UserItem.mutations';
import { IUser } from 'common/common.interfaces';
import { fetchUsersList } from 'common/common.queries';

const UserItem = ({ user }: { user: IUser }) => {
    const history = useHistory();

    return (
        <div key={user.id}>
            <ListItem
                button
                onClick={() => {
                    history.push(`/users/${user.id}`);
                }}
            >
                <ListItemAvatar>
                    <Avatar
                        alt="Remy Sharp"
                        src="http://lorempixel.com/50/50"
                    />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="like"
                        onClick={() => {
                            onAddLike(user.id, user.likes);
                        }}
                    >
                        <Badge
                            badgeContent={user.likes}
                            color="secondary"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                        >
                            <ThumbUpIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                            onDeleteUser(user.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
                ,
            </ListItem>
            <Divider />
        </div>
    );
};

export default UserItem;

async function onAddLike(id: string, likesBeforeClick: number) {
    const [addLike] = useMutation(mutationForAddLike);
    await addLike({
        variables: { id },
        optimisticResponse: {
            __typename: 'Mutation',
            addLikeToUser: {
                __typename: 'User',
                id,
                likes: likesBeforeClick + 1
            }
        },
        refetchQueries: [{ query: fetchUsersList }]
    });
}

async function onDeleteUser(id: string) {
    const [deleteUser] = useMutation(mutationForDeleteUser);
    await deleteUser({
        variables: { id },
        refetchQueries: [{ query: fetchUsersList }]
    });
}
