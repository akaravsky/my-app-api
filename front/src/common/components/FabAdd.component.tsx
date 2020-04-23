import React from 'react';

import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const FabAdd = ({ onClick }: { onClick: () => void }): JSX.Element => {
    return (
        <Fab color="primary" aria-label="add" onClick={onClick}>
            <AddIcon />
        </Fab>
    );
};

export default FabAdd;
