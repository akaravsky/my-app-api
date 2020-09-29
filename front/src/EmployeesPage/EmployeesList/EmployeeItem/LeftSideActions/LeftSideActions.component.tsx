import React from 'react';
import { ListItemSecondaryAction } from '@material-ui/core';

import DeleteButton from 'common/components/DeleteButton.component';
import EditButton from './EditButton.component';

import {
    useAddLike,
    useDeleteEmployee,
    useEditEmployee
} from './LeftSideActions.hooks';
import { Employee } from 'common/common.interfaces';
import ThumbUpBadgeButton from './ThumbUpBadgeButton.component';
import EmployeePostsButton from './EmployeePostsButton.component';

const LeftSideActions = ({ employee }: { employee: Employee }): JSX.Element => {
    const onAddLike = useAddLike(employee.id, employee.likes);
    const onDeleteEmployee = useDeleteEmployee(employee.id);
    const onEditEmployee = useEditEmployee(employee.id);

    return (
        <ListItemSecondaryAction>
            <ThumbUpBadgeButton onClick={onAddLike} badgeContent={employee.likes} />
            <EmployeePostsButton onClick={(): void => undefined} />
            <EditButton onClick={onEditEmployee} />
            <DeleteButton onClick={onDeleteEmployee} />
        </ListItemSecondaryAction>
    );
};

export default LeftSideActions;
