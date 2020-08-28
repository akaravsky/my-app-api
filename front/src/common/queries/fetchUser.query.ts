import gql from 'graphql-tag';

export default gql`
    query User($id: String!) {
        user(id: $id) {
            name
            company {
                name
            }
        }
    }
`;