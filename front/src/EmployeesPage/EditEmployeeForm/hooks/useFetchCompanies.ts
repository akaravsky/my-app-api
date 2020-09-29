import { useQuery } from '@apollo/react-hooks';
import { ApolloError } from "apollo-client";
import { CompaniesListQuery } from "CompaniesPage/CompaniesList/CompaniesList.interfaces";
import fetchCompaniesListQuery from "common/queries/fetchCompaniesList.query";
import { Company } from 'common/common.interfaces';

interface FetchCompanies {
     companies?: Array<Company>;
     loading: boolean; 
     error?: ApolloError;
}

export default function useFetchCompanies(): FetchCompanies {
    const {
        loading,
        error,
        data
    } = useQuery<CompaniesListQuery>(fetchCompaniesListQuery, {
        fetchPolicy: 'no-cache'
    });
    return { companies: data?.companies, loading, error }
}