import { useMutation } from '@apollo/react-hooks';
import { signup as signupMutation } from '../mutations';
import currentUserQuery from 'common/queries/currentUser.query';
import { useRedirectAfterAuth } from 'AuthPage/hooks';

export default (
    email: string,
    password: string
): { signup: () => void; error?: string } => {
    const [signup, { error }] = useMutation(signupMutation);
    useRedirectAfterAuth();
    return {
        signup: async (): Promise<void> => {
            try {
                await signup({
                    variables: { email, password },
                    refetchQueries: [{ query: currentUserQuery }]
                });
            } catch (error) {}
        },
        error: error?.message
    };
};
