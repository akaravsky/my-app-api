import React from 'react';
import { ListItemSecondaryAction } from '@material-ui/core';

import DeleteButton from 'common/components/DeleteButton.component';

import useDeleteCompany from './hooks/useDeleteCompany.hook';
import { Company } from 'common/common.interfaces';

const LeftSideActions = ({ company }: { company: Company }): JSX.Element => {
    const onDeleteCompany = useDeleteCompany(company.id);
    return (
        <ListItemSecondaryAction>
            <DeleteButton onClick={onDeleteCompany} />
        </ListItemSecondaryAction>
    );
};

export default LeftSideActions;
