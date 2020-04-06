import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import Header from './Header.component'

const Home = lazy(() => import('./Home'));
//const Users = lazy(() => import('./Users.jsx'));
const About = lazy(() => import('./About'));

import UsersList from './UsersList.component'
import CreateUserForm from './CreateUserForm.component';
import UserDetails from './UserDetails.component';

const cache = new InMemoryCache({
    dataIdFromObject: o => o.id //we can add some identifier that helps apollo know which component should be updated after changing 
});
const link = new HttpLink({
    uri: 'http://localhost:3000/graphql'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link
});

const App = () => {
    const [tab, setTab] = React.useState();

    return (
        <ApolloProvider client={client}>
            <Router>
                <Header tab={tab} setTab={setTab} />

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/users/new">
                            <CreateUserForm setTab={setTab}/>
                        </Route>
                        <Route path="/users/:id">
                            <UserDetails />
                        </Route>
                        <Route path="/users">
                            <UsersList />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/">
                            <Home props1={'MyHome'} props2={1} />
                        </Route>
                    </Switch>
                </Suspense>
            </Router>
        </ApolloProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
