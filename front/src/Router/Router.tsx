import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Auth from 'AuthPage/AuthPage';
import Header from '../Header/Header.component';

const Home = lazy(() => import('../Home'));
const About = lazy(() => import('../About'));
const CreateEmployeeForm = lazy(() =>
    import('EmployeesPage/CreateEmployeeForm/CreateEmployeeForm.component')
);
const EditEmployeeForm = lazy(() =>
    import('EmployeesPage/EditEmployeeForm/EditEmployeeForm.component')
);
const EmployeesPage = lazy(() =>
    import('EmployeesPage/EmployeesPage.component')
);
const Companies = lazy(() => import('CompaniesPage/CompaniesPage.component'));
const CreateCompanyForm = lazy(() =>
    import(
        'CompaniesPage/CompaniesList/CreateCompanyForm/CreateCompanyForm.component'
    )
);

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
                    <Route exact path="/auth">
                        <Auth />
                    </Route>
                    <PrivateRoute exact path="/">
                        <Home props1={'MyHome'} props2={1} />
                    </PrivateRoute>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
