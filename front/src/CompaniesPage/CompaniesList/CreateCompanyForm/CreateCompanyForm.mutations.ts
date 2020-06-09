import gql from 'graphql-tag';

export const mutationForAddCompany = gql`
    mutation AddCompany($name: String!) {
        addCompany(name: $name) {
            name
        }
    }
`;
