import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router';

import { fetchUsersList } from 'common/queries/fetchUsersList.query';
import {
    mutationForAddLike,
    mutationForDeleteUser
} from '../UserItem.mutations';

export const useAddLike = (
    id: string,
    likesBeforeClick: number
): (() => void) => {
    const [addLike] = useMutation(mutationForAddLike);

    return (): void => {
        addLike({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                addLikeToUser: {
                    __typename: 'User',
                    id,
                    likes: likesBeforeClick + 1
                }
            },
            refetchQueries: [{ query: fetchUsersList }]
        });
    };
};

export const useDeleteUser = (id: string): (() => void) => {
    const [deleteUser] = useMutation(mutationForDeleteUser);

    return (): void => {
        deleteUser({
            variables: { id },
            refetchQueries: [{ query: fetchUsersList }]
        });
    };
};

export const useEditUser = (id: string): (() => void) => {
    const history = useHistory();

    return (): void => {
        history.push(`/users/${id}`);
    };
};
