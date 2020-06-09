import React from 'react';

import { IconButton } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';

const UserPostsButton = ({ onClick }: { onClick: () => void }): JSX.Element => {
    return (
        <IconButton edge="end" aria-label="delete" onClick={onClick}>
            <ListIcon />
        </IconButton>
    );
};

export default UserPostsButton;
