import React from 'react';
import { useHistory } from 'react-router';

import EmployeesList from 'EmployeesPage/EmployeesList/EmployeesList.component';
import FabAdd from 'common/components/FabAdd.component';

import useStylesForEmployeesPage from './EmployeesPage.styles';

const EmployeesPage = (): JSX.Element => {
    const classes = useStylesForEmployeesPage();
    const history = useHistory();

    const addEmployee = (): void => {
        history.push('/employees/new');
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <EmployeesList />
                <div className={classes.fabAddContainer}>
                    <FabAdd onClick={addEmployee} />
                </div>
            </div>
        </div>
    );
};

export default EmployeesPage;
