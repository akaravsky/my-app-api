import React from 'react';

import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider
} from '@material-ui/core';

import { Employee } from 'common/common.interfaces';
import LeftSideActions from './LeftSideActions/LeftSideActions.component';

const EmployeeItem = ({ employee }: { employee: Employee }): JSX.Element => {
    return (
        <div key={employee.id}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar src="http://lorempixel.com/50/50" />
                </ListItemAvatar>
                <ListItemText primary={employee.name} />
                <LeftSideActions employee={employee} />
            </ListItem>
            <Divider />
        </div>
    );
};

export default EmployeeItem;
