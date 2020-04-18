import { useMutation } from '@apollo/react-hooks';
import { fetchUsersList } from 'common/common.queries';
import {
    mutationForAddLike,
    mutationForDeleteUser
} from './UserItem.mutations';

export const useAddLike = (id: string, likesBeforeClick: number): Function => {
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

export const useDeleteUser = (id: string): Function => {
    const [deleteUser] = useMutation(mutationForDeleteUser);

    return (): void => {
        deleteUser({
            variables: { id },
            refetchQueries: [{ query: fetchUsersList }]
        });
    };
};
