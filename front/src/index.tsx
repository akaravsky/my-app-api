import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Home = lazy(() => import('./Home'));
//const Users = lazy(() => import('./Users.jsx'));
const About = lazy(() => import('./About'));

import Users from './Users'

import './index.css';

const App = () => {
    return (
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
                            <Users />
                        </Route>
                        <Route path="/">
                            <Home props1={'MyHome'} props2={1}/>
                        </Route>
                    </Switch>
                </Suspense>
            </div>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))