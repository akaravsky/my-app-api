import React from 'react';

import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const EditButton = ({ onClick }: { onClick: () => void }): JSX.Element => {
    return (
        <IconButton edge="end" aria-label="delete" onClick={onClick}>
            <EditIcon />
        </IconButton>
    );
};

export default EditButton;
