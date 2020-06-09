import gql from 'graphql-tag';

export default gql`
    mutation DeleteCompany($id: String!) {
        deleteCompany(id: $id) {
            id
            name
        }
    }
`;
