import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { List, CircularProgress } from '@material-ui/core';

import fetchCompaniesListQuery from 'common/queries/fetchCompaniesList.query';
import { CompaniesListQuery } from './CompaniesList.interfaces';
import { Company } from 'common/common.interfaces';
import CompanyItem from './CompanyItem/CompanyItem.component';

const CompaniesList = (): JSX.Element => {
    const { loading, data = { companies: [] } } = useQuery<CompaniesListQuery>(
        fetchCompaniesListQuery
    );

    if (loading) {
        return <CircularProgress />;
    }
    return (
        <List component="nav">
            {data.companies.map((company: Company) => (
                <CompanyItem key={company.id} company={company} />
            ))}
        </List>
    );
};

export default CompaniesList;
