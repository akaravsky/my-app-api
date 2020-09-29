import gql from 'graphql-tag';

export default gql`
    {
        employeesList {
            id
            name
            likes
        }
    }
`;
