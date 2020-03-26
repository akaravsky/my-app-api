import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import ApolloClient, { ApolloClientOptions } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const Home = lazy(() => import('./Home'));
//const Users = lazy(() => import('./Users.jsx'));
const About = lazy(() => import('./About'));

import UsersList from './UsersList/UsersList.component'

import './index.css';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:3000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/users">
                                <UsersList />
                            </Route>
                            <Route path="/">
                                <Home props1={'MyHome'} props2={1} />
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </ApolloProvider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))