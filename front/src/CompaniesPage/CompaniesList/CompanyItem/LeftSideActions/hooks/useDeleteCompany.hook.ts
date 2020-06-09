import { useMutation } from '@apollo/react-hooks';

import deleteCompanyMutation from '../../mutations/deleteCompany';
import fetchCompaniesListQuery from 'common/queries/fetchCompaniesList.query';

export default (id: string): (() => void) => {
    const [deleteCompany] = useMutation(deleteCompanyMutation);

    return (): void => {
        deleteCompany({
            variables: { id },
            refetchQueries: [{ query: fetchCompaniesListQuery }]
        });
    };
};
