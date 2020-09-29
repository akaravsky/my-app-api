import { useMutation } from '@apollo/react-hooks';
import fetchEmployeesListQuery from 'common/queries/fetchEmployeesList.query';
import { useHistory } from 'react-router';


import {
    mutationForAddLike,
    mutationForDeleteEmployee
} from '../EmployeeItem.mutations';

export const useAddLike = (
    id?: string,
    likesBeforeClick?: number
): (() => void) => {
    const [addLike] = useMutation(mutationForAddLike);

    if(!id) return () => {}

    return (): void => {
        addLike({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                addLikeToEmployee: {
                    __typename: 'Employee',
                    id,
                    likes: likesBeforeClick ? likesBeforeClick + 1 : 1
                }
            },
            refetchQueries: [{ query: fetchEmployeesListQuery }]
        });
    };
};

export const useDeleteEmployee = (id?: string): (() => void) => {
    const [deleteEmployee] = useMutation(mutationForDeleteEmployee);

    return (): void => {
        deleteEmployee({
            variables: { id },
            refetchQueries: [{ query: fetchEmployeesListQuery }]
        });
    };
};

export const useEditEmployee = (id?: string): (() => void) => {
    const history = useHistory();

    return (): void => {
        history.push(`/employees/${id}`);
    };
};
