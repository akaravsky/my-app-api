import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { AppBar, Tabs, Tab } from '@material-ui/core';

const Header = ({
    tab,
    setTab
}: {
    tab: number | undefined;
    setTab: Function;
}): JSX.Element | null => {
    const history = useHistory();
    const location = useLocation();

    React.useEffect(() => {
        switch (location.pathname) {
            case '/':
                setTab(0);
                break;
            case '/users':
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
                history.push('/users');
                break;
            case 2:
                history.push('/companies');
                break;
            case 3:
                history.push('/about');
                break;
        }
    };
    if (tab === undefined) {
        return null;
    }

    return (
        <AppBar position="static">
            <Tabs value={tab} onChange={handleChange}>
                <Tab label="Home" />
                <Tab label="Users" />
                <Tab label="Companies" />
                <Tab label="About" />
            </Tabs>
        </AppBar>
    );
};

export default Header;
