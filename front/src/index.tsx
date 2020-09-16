import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import Router from './Router';

const cache = new InMemoryCache({
    dataIdFromObject: (o): string | undefined => o.id //we can add some identifier that helps apollo know which component should be updated after changing
});
const link = new HttpLink({
    uri: 'http://localhost:3000/graphql'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link
});

const App = (): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <Router />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
