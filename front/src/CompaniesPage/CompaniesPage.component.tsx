import React from 'react';
import { useHistory } from 'react-router';

import CompaniesList from './CompaniesList/CompaniesList.component';
import FabAdd from 'common/components/FabAdd.component';

import useStylesForCompaniesPage from './CompaniesPage.styles';

const CompaniesPage = (): JSX.Element => {
    const classes = useStylesForCompaniesPage();
    const history = useHistory();

    const addCompany = (): void => {
        history.push('/companies/new');
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <CompaniesList />
                <div className={classes.fabAddContainer}>
                    <FabAdd onClick={addCompany} />
                </div>
            </div>
        </div>
    );
};

export default CompaniesPage;
