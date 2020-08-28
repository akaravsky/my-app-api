import gql from 'graphql-tag';

export default gql`
    mutation AddUser($name: String!) {
        addUser(name: $name) {
            name
        }
    }
`;