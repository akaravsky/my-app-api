import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { List, CircularProgress } from '@material-ui/core';
import { fetchUsersList } from 'common/queries/fetchUsersList.query';

const Companies = (): JSX.Element => {
    /*const { loading, data = { usersList: [] } } = useQuery<UsersListQuery>(
        fetchUsersList
    );

    if (loading) {
        return <CircularProgress />;
    }*/

    return (
        <List component="nav">
            <div>Company</div>
        </List>
    );
};

export default Companies;
