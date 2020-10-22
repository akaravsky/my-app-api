import { useMutation } from '@apollo/react-hooks';
import { signup as signupMutation } from '../mutations';
import currentUserQuery from 'common/queries/currentUser.query';
import { useHistory } from 'react-router';

export default (
    email: string,
    password: string
): { signup: () => void; error?: string } => {
    const [signup, { error }] = useMutation(signupMutation);
    const history = useHistory();

    return {
        signup: async (): Promise<void> => {
            try {
                await signup({
                    variables: { email, password },
                    refetchQueries: [{ query: currentUserQuery }]
                });
                history.push('/');
            } catch (error) {}
        },
        error: error?.message
    };
};
