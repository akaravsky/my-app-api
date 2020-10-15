import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header/Header.component';

const Home = lazy(() => import('./Home'));
//const Employees = lazy(() => import('./Employees.jsx'));
const About = lazy(() => import('./About'));

import CreateEmployeeForm from 'EmployeesPage/CreateEmployeeForm/CreateEmployeeForm.component';
import EditEmployeeForm from 'EmployeesPage/EditEmployeeForm/EditEmployeeForm.component';
import EmployeesPage from 'EmployeesPage/EmployeesPage.component';
import Companies from 'CompaniesPage/CompaniesPage.component';
import CreateCompanyForm from 'CompaniesPage/CompaniesList/CreateCompanyForm/CreateCompanyForm.component';
import Auth from 'Auth';

const Router = (): JSX.Element => {
    const [tab, setTab] = React.useState();
    return (
        <BrowserRouter>
            <Header tab={tab} setTab={setTab} />
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/employees/new">
                        <CreateEmployeeForm setTab={setTab} />
                    </Route>
                    <Route path="/employees/:id">
                        <EditEmployeeForm setTab={setTab} />
                    </Route>
                    <Route path="/employees">
                        <EmployeesPage />
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
                    <Route path="/auth">
                        <Auth />
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
