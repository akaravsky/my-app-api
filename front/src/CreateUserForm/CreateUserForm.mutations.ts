import gql from 'graphql-tag';

export const mutationForAddUser = gql`
    mutation AddUser($name: String!) {
        addUser(name: $name) {
            name
        }
    }
`;
