import { useMutation } from '@apollo/react-hooks';
import { login as loginMutation } from '../mutation';
import currentUserQuery from 'common/queries/currentUser.query';
import { useHistory } from 'react-router';

export default (
    email: string,
    password: string
): { login: () => void; error?: string } => {
    const [login, { error }] = useMutation(loginMutation);
    const history = useHistory();

    return {
        login: async (): Promise<void> => {
            try {
                await login({
                    variables: { email, password },
                    refetchQueries: [{ query: currentUserQuery }]
                });
                history.push('/');
            } catch (error) {}
        },
        error: error?.message
    };
};
