import React from 'react';
import {
    useHistory
} from "react-router-dom";

import { AppBar, Tabs, Tab } from '@material-ui/core';

const Header = ({tab, setTab}:{tab:number, setTab:Function}) => {
    let history = useHistory();

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