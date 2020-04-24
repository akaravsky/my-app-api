import React from 'react';

import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({ onClick }: { onClick: () => void }): JSX.Element => {
    return (
        <IconButton edge="end" aria-label="delete" onClick={onClick}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteButton;
