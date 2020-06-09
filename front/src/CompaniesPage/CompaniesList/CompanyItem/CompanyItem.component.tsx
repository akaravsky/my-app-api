import React from 'react';

import { ListItem, ListItemText, Divider } from '@material-ui/core';

import { Company } from 'common/common.interfaces';
import LeftSideActions from './LeftSideActions/LeftSideActions.component';

const CompanyItem = ({ company }: { company: Company }): JSX.Element => {
    return (
        <div key={company.name}>
            <ListItem>
                <ListItemText primary={company.name} />
                <LeftSideActions company={company} />
            </ListItem>
            <Divider />
        </div>
    );
};

export default CompanyItem;
