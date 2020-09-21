import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header.component';

const Home = lazy(() => import('./Home'));
//const Users = lazy(() => import('./Users.jsx'));
const About = lazy(() => import('./About'));

import CreateUserForm from 'UsersPage/CreateUserForm/CreateUserForm.component';
import EditUserForm from 'UsersPage/EditUserForm/EditUserForm.component';
import UsersPage from 'UsersPage/UsersPage.component';
import Companies from 'CompaniesPage/CompaniesPage.component';
import CreateCompanyForm from 'CompaniesPage/CompaniesList/CreateCompanyForm/CreateCompanyForm.component';
import Login from 'Login';

const Router = (): JSX.Element => {
    const [tab, setTab] = React.useState();
    return (
        <BrowserRouter>
            <Header tab={tab} setTab={setTab} />
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/users/new">
                        <CreateUserForm setTab={setTab} />
                    </Route>
                    <Route path="/users/:id">
                        <EditUserForm setTab={setTab} />
                    </Route>
                    <Route path="/users">
                        <UsersPage />
                    </Route>
                    <Route path="/companies/new">
                        <CreateCompanyForm setTab={setTab} />
                    </Route>
                    <Route path="/companies">
                        <Companies />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Home props1={'MyHome'} props2={1} />
                    </Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
