import gql from 'graphql-tag';
import { FormEvent } from 'react';
import { useHistory, useParams } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import { History, LocationState } from 'history';
import fetchUsersListQuery from 'common/queries/fetchUsersList.query';


const mutation = gql`
    mutation EditUser($name: String!, $id: String!, $companyId: String) {
        updateUser(name: $name, id: $id, companyId: $companyId) {
            name
            id
            company {
                name
            }
        }
    }
`;

const useHandleSubmit = (
    userName: string,
    companyId: string,
    setTab: Function
): [(event: FormEvent<HTMLFormElement>) => void, string | undefined] => {
    const history = useHistory();
    const { id } = useParams();
    const [editUser, { error }] = useMutation(mutation);
    return [
        handleSubmit.bind(null, editUser, userName, companyId, id, history, setTab),
        error?.message
    ];
};

async function handleSubmit(
    editUser: Function,
    userName: string,
    companyId: string,
    id: string,
    history: History<LocationState>,
    setTab: Function,
    e: FormEvent<HTMLFormElement>
): Promise<void> {
    e.preventDefault();
    await editUser({
        variables: { name: userName, companyId, id: id },
        refetchQueries: [{ query: fetchUsersListQuery }]
    });
    history.push('/users');
    setTab(1);
}

export default useHandleSubmit;