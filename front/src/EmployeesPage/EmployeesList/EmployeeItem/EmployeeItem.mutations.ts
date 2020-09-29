import gql from 'graphql-tag';

export const mutationForDeleteEmployee = gql`
    mutation DeleteEmployee($id: String!) {
        deleteEmployee(id: $id) {
            id
            name
        }
    }
`;

export const mutationForAddLike = gql`
    mutation AddLikeToEmployee($id: String!) {
        addLikeToEmployee(id: $id) {
            id
            name
        }
    }
`;
