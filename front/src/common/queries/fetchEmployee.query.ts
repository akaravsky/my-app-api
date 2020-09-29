import gql from 'graphql-tag';

export default gql`
    query Employee($id: String!) {
        employee(id: $id) {
            name
            company {
                name
                id
            }
        }
    }
`;