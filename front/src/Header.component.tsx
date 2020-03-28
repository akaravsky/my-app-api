import React from 'react';
import {
    useHistory, useLocation
} from "react-router-dom";

import { AppBar, Tabs, Tab } from '@material-ui/core';

const Header = ({ tab, setTab }: { tab: number, setTab: Function }) => {
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
            case '/about':
                setTab(2);
                break;

        }
    }, [])

    const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
        setTab(newTab);
        switch (newTab) {
            case 0:
                history.push('/')
                break;
            case 1:
                history.push('/users')
                break;
            case 2:
                history.push('/about')
                break;

        }
    }
    if (tab === undefined) {
        return null
    }

    return (
        <AppBar position="static">
            <Tabs value={tab} onChange={handleChange} >
                <Tab label="Home" />
                <Tab label="Users" />
                <Tab label="About" />
            </Tabs>
        </AppBar>
    )
}

export default Header;