import React from 'react';

import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider
} from '@material-ui/core';

import { User } from 'common/common.interfaces';
import LeftSideActions from './LeftSideActions/LeftSideActions.component';

const UserItem = ({ user }: { user: User }): JSX.Element => {
    return (
        <div key={user.id}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar
                        src="http://lorempixel.com/50/50"
                    />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                <LeftSideActions user={user} />
            </ListItem>
            <Divider />
        </div>
    );
};

export default UserItem;
