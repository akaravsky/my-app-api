import { useMutation } from '@apollo/react-hooks';
import { login as loginMutation } from '../mutation';
import currentUserQuery from 'common/queries/currentUser.query';
import { useRedirectAfterAuth } from 'AuthPage/hooks';

export default (
    email: string,
    password: string
): { login: () => void; error?: string } => {
    const [login, { error }] = useMutation(loginMutation);
    useRedirectAfterAuth();
    return {
        login: async (): Promise<void> => {
            try {
                await login({
                    variables: { email, password },
                    refetchQueries: [{ query: currentUserQuery }]
                });
            } catch (error) {}
        },
        error: error?.message
    };
};
