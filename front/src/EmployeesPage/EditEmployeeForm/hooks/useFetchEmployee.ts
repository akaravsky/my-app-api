import { useParams } from "react-router";
import { useQuery } from '@apollo/react-hooks';
import fetchEmployeeQuery from "common/queries/fetchEmployee.query";
import { Employee } from "common/common.interfaces";
import { ApolloError } from "apollo-client";

interface FetchEmployee {
    employee: Employee;
     loading: boolean; 
     error?: ApolloError;
}

export default function useFetchEmployee(): FetchEmployee {
    const { id } = useParams();
    const {
        loading,
        error,
        data: { employee } = { employee: { name: '', company: { name: '' } } }
    } = useQuery<{ employee: Employee }>(fetchEmployeeQuery, {
        variables: { id },
        fetchPolicy: 'no-cache'
    });
    return { employee, loading, error }
}