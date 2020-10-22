import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab, Toolbar } from '@material-ui/core';

import currentUserQuery from 'common/queries/currentUser.query';
import { useQuery } from 'react-apollo';
import { User } from 'common/common.interfaces';
import useStylesForHeader from './Header.styles';
import LogoutButton from './LogoutButton.component';

const Header = ({
    tab,
    setTab
}: {
    tab: number | undefined;
    setTab: Function;
}): JSX.Element | null => {
    const history = useHistory();
    const location = useLocation();
    const classes = useStylesForHeader();

    React.useEffect(() => {
        switch (location.pathname) {
            case '/':
                setTab(0);
                break;
            case '/employees':
                setTab(1);
                break;
            case '/companies':
                setTab(2);
                break;
            case '/about':
                setTab(3);
                break;
        }
    }, [setTab, location.pathname]);

    const handleChange = (
        event: React.ChangeEvent<{}>,
        newTab: number
    ): void => {
        setTab(newTab);
        switch (newTab) {
            case 0:
                history.push('/');
                break;
            case 1:
                history.push('/employees');
                break;
            case 2:
                history.push('/companies');
                break;
            case 3:
                history.push('/about');
                break;
        }
    };
    if (tab === undefined || location.pathname === '/auth') {
        return null;
    }

    return (
        <AppBar position="static" classes={{ root: classes.root }}>
            <Tabs value={tab} onChange={handleChange}>
                <Tab label="Home" />
                <Tab label="Employees" />
                <Tab label="Companies" />
                <Tab label="About" />
            </Tabs>
            <Toolbar classes={{ root: classes.toolbar }}>
                <LogoutButton />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
