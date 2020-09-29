import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { History, LocationState } from 'history';

import mutationForAddEmployee from 'common/mutations/addEmployee';
import fetchEmployeesList from 'common/queries/fetchEmployeesList.query';

const useHandleSubmit = (
    value: string,
    setTab: Function
): [(event: FormEvent<HTMLFormElement>) => void, string | undefined] => {
    const history = useHistory();
    const [addEmployee, { error }] = useMutation(mutationForAddEmployee);
    return [
        handleSubmit.bind(null, addEmployee, value, history, setTab),
        error?.message
    ];
};

async function handleSubmit(
    addEmployee: Function,
    value: string,
    history: History<LocationState>,
    setTab: Function,
    e: FormEvent<HTMLFormElement>
): Promise<void> {
    e.preventDefault();
    await addEmployee({
        variables: { name: value },
        refetchQueries: [{ query: fetchEmployeesList }]
    });
    history.push('/employees');
    setTab(1);
}

export default useHandleSubmit;