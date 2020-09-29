import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { List, CircularProgress } from '@material-ui/core';
import { Employee } from 'common/common.interfaces';
import fetchEmployeesListQuery from 'common/queries/fetchEmployeesList.query';
import { EmployeesListQuery } from './EmployeesList.interfaces';
import EmployeeItem from './EmployeeItem/EmployeeItem.component';

const EmployeesList = (): JSX.Element => {
    const { loading, data = { employeesList: [] } } = useQuery<EmployeesListQuery>(
        fetchEmployeesListQuery
    );

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <List component="nav">
            {data.employeesList.map((employee: Employee) => (
                <EmployeeItem employee={employee} key={employee.id} />
            ))}
        </List>
    );
};

export default EmployeesList;
