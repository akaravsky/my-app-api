import React from 'react';
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

import { User } from 'common/common.interfaces';
import { useAddLike, useDeleteUser } from './UserItem.hooks';

const UserItem = ({ user }: { user: User }): JSX.Element => {
    const history = useHistory();
    const onAddLike = useAddLike(user.id, user.likes);
    const onDeleteUser = useDeleteUser(user.id);

    return (
        <div key={user.id}>
            <ListItem
                button
                onClick={(): void => {
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
                        onClick={(): void => onAddLike()}
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
                        onClick={(): void => {
                            onDeleteUser();
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
