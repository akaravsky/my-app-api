import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { History, LocationState } from 'history';

import { mutationForAddCompany } from './CreateCompanyForm.mutations';
import fetchCompaniesList from 'common/queries/fetchCompaniesList.query';

export const useHandleSubmit = (
    value: string,
    setTab: Function
): [(event: FormEvent<HTMLFormElement>) => void, string | undefined] => {
    const history = useHistory();
    const [addCompany, { error }] = useMutation(mutationForAddCompany);
    return [
        handleSubmit.bind(null, addCompany, value, history, setTab),
        error?.message
    ];
};

async function handleSubmit(
    addCompany: Function,
    value: string,
    history: History<LocationState>,
    setTab: Function,
    e: FormEvent<HTMLFormElement>
): Promise<void> {
    e.preventDefault();
    await addCompany({
        variables: { name: value },
        refetchQueries: [{ query: fetchCompaniesList }]
    });
    history.push('/companies');
    setTab(2);
}
