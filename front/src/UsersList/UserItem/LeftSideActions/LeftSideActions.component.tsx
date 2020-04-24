import React from 'react';
import { ListItemSecondaryAction } from '@material-ui/core';

import DeleteButton from 'common/components/DeleteButton.component';
import EditButton from './EditButton.component';

import {
    useAddLike,
    useDeleteUser,
    useEditUser
} from './LeftSideActions.hooks';
import { User } from 'common/common.interfaces';
import ThumbUpBadgeButton from './ThumbUpBadgeButton.component';
import UserPostsButton from './UserPostsButton.component';

const LeftSideActions = ({ user }: { user: User }): JSX.Element => {
    const onAddLike = useAddLike(user.id, user.likes);
    const onDeleteUser = useDeleteUser(user.id);
    const onEditUser = useEditUser(user.id);

    return (
        <ListItemSecondaryAction>
            <ThumbUpBadgeButton onClick={onAddLike} badgeContent={user.likes} />
            <UserPostsButton onClick={()=>{}} />
            <EditButton onClick={onEditUser} />
            <DeleteButton onClick={onDeleteUser} />
        </ListItemSecondaryAction>
    );
};

export default LeftSideActions;
