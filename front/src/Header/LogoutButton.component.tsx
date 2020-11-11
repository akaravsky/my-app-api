import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { logout as logoutMutation } from './mutations';
import { useMutation } from 'react-apollo';
import currentUserQuery from 'common/queries/currentUser.query';

const Header = (): JSX.Element => {
    const history = useHistory();
    const [logout] = useMutation(logoutMutation);

    const handleClick = async (): Promise<void> => {
        await logout({
            refetchQueries: [{ query: currentUserQuery }]
        });
        history.push('/auth');
    };

    return <Button onClick={handleClick}>Log out</Button>;
};

export default Header;
