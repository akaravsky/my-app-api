import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../Header/Header.component';

const Home = lazy(() => import('../Home'));
//const Employees = lazy(() => import('./Employees.jsx'));
const About = lazy(() => import('../About'));

import CreateEmployeeForm from 'EmployeesPage/CreateEmployeeForm/CreateEmployeeForm.component';
import EditEmployeeForm from 'EmployeesPage/EditEmployeeForm/EditEmployeeForm.component';
import EmployeesPage from 'EmployeesPage/EmployeesPage.component';
import Companies from 'CompaniesPage/CompaniesPage.component';
import CreateCompanyForm from 'CompaniesPage/CompaniesList/CreateCompanyForm/CreateCompanyForm.component';
import Auth from 'AuthPage/AuthPage';
import PrivateRoute from './PrivateRoute';

const Router = (): JSX.Element => {
    const [tab, setTab] = React.useState();
    return (
        <BrowserRouter>
            <Header tab={tab} setTab={setTab} />
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <PrivateRoute path="/employees/new">
                        <CreateEmployeeForm setTab={setTab} />
                    </PrivateRoute>
                    <PrivateRoute path="/employees/:id">
                        <EditEmployeeForm setTab={setTab} />
                    </PrivateRoute>
                    <PrivateRoute path="/employees">
                        <EmployeesPage />
                    </PrivateRoute>
                    <PrivateRoute path="/companies/new">
                        <CreateCompanyForm setTab={setTab} />
                    </PrivateRoute>
                    <PrivateRoute path="/companies">
                        <Companies />
                    </PrivateRoute>
                    <PrivateRoute path="/about">
                        <About />
                    </PrivateRoute>
                    <Route path="/auth">
                        <Auth />
                    </Route>
                    <PrivateRoute path="/">
                        <Home props1={'MyHome'} props2={1} />
                    </PrivateRoute>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
