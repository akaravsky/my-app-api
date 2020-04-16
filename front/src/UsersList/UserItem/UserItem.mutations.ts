import gql from 'graphql-tag';

export const mutationForDeleteUser = gql`
    mutation DeleteUser($id: String!) {
        deleteUser(id: $id) {
            id
            name
        }
    }
`;

export const mutationForAddLike = gql`
    mutation AddLikeToUser($id: String!) {
        addLikeToUser(id: $id) {
            id
            name
        }
    }
`;
