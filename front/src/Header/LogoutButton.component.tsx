import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { logout as logoutMutation } from './mutations';
import { useMutation } from 'react-apollo';

const Header = () => {
    const history = useHistory();
    const [logout] = useMutation(logoutMutation);

    const handleClick = () => {
        history.push('/auth');
        logout();
    };

    return <Button onClick={handleClick}>Log out</Button>;
};

export default Header;
