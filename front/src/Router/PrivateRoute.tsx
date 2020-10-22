import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from 'react-apollo';

import currentUserQuery from 'common/queries/currentUser.query';
import { User } from 'common/common.interfaces';

function PrivateRoute({
    children,
    ...restProps
}: {
    children: JSX.Element;
    [name: string]: any;
}): JSX.Element {
    const { loading, data } = useQuery<User>(currentUserQuery);
    console.log('PRIVATE', data, loading);

    return (
        <Route
            {...restProps}
            render={({ location }): JSX.Element =>
                data ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: '/auth', state: { from: location } }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;
