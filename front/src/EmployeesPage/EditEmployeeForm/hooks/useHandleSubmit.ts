import gql from 'graphql-tag';
import { FormEvent } from 'react';
import { useHistory, useParams } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import { History, LocationState } from 'history';
import fetchEmployeesListQuery from 'common/queries/fetchEmployeesList.query';


const mutation = gql`
    mutation EditEmployee($name: String!, $id: String!, $companyId: String) {
        updateEmployee(name: $name, id: $id, companyId: $companyId) {
            name
            id
            company {
                name
            }
        }
    }
`;

const useHandleSubmit = (
    employeeName: string,
    companyId: string,
    setTab: Function
): [(event: FormEvent<HTMLFormElement>) => void, string | undefined] => {
    const history = useHistory();
    const { id } = useParams();
    const [editEmployee, { error }] = useMutation(mutation);
    return [
        handleSubmit.bind(null, editEmployee, employeeName, companyId, id, history, setTab),
        error?.message
    ];
};

async function handleSubmit(
    editEmployee: Function,
    employeeName: string,
    companyId: string,
    id: string,
    history: History<LocationState>,
    setTab: Function,
    e: FormEvent<HTMLFormElement>
): Promise<void> {
    e.preventDefault();
    await editEmployee({
        variables: { name: employeeName, companyId, id: id },
        refetchQueries: [{ query: fetchEmployeesListQuery }]
    });
    history.push('/employees');
    setTab(1);
}

export default useHandleSubmit;