import { useParams } from "react-router";
import { useQuery } from '@apollo/react-hooks';
import fetchUserQuery from "common/queries/fetchUser.query";
import { User } from "common/common.interfaces";
import { ApolloError } from "apollo-client";

interface FetchUser {
     user: User;
     loading: boolean; 
     error?: ApolloError;
}

export default function useFetchUser(): FetchUser {
    const { id } = useParams();
    const {
        loading,
        error,
        data: { user } = { user: { name: '', company: { name: '' } } }
    } = useQuery<{ user: User }>(fetchUserQuery, {
        variables: { id },
        fetchPolicy: 'no-cache'
    });
    return { user, loading, error }
}