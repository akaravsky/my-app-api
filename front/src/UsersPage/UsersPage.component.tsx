import React from 'react';
import { useHistory } from 'react-router';

import UsersList from 'UsersList/UsersList.component';
import FabAdd from 'common/components/FabAdd.component';

import { useStylesForUsersPage } from './UsersPage.styles';

const UsersPage = (): JSX.Element => {
    const classes = useStylesForUsersPage();
    const history = useHistory();

    const addUser = (): void => {
        history.push('/users/new');
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <UsersList />
                <div className={classes.fabAddContainer}>
                    <FabAdd onClick={addUser} />
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
