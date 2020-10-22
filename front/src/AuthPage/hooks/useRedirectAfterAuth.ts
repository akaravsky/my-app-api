import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import currentUserQuery from 'common/queries/currentUser.query';
import { useHistory } from 'react-router';

export default function useRedirectAfterLogin(): void {
    const { data } = useQuery(currentUserQuery);
    const history = useHistory();

    React.useEffect(() => {
        if (data?.user) {
            history.push('/');
        }
    }, [history, data]);
}
