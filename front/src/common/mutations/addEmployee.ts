import gql from 'graphql-tag';

export default gql`
    mutation AddEmployee($name: String!) {
        addEmployee(name: $name) {
            name
        }
    }
`;