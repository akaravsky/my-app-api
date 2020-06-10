import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { History, LocationState } from 'history';

import { mutationForAddUser } from './UserForm.mutations';
import fetchUsersList from 'common/queries/fetchUsersList.query';

export const useHandleSubmit = (
    value: string,
    setTab: Function
): [(event: FormEvent<HTMLFormElement>) => void, string | undefined] => {
    const history = useHistory();
    const [addUser, { error }] = useMutation(mutationForAddUser);
    return [
        handleSubmit.bind(null, addUser, value, history, setTab),
        error?.message
    ];
};

async function handleSubmit(
    addUser: Function,
    value: string,
    history: History<LocationState>,
    setTab: Function,
    e: FormEvent<HTMLFormElement>
): Promise<void> {
    e.preventDefault();
    await addUser({
        variables: { name: value },
        refetchQueries: [{ query: fetchUsersList }]
    });
    history.push('/users');
    setTab(1);
}
