import gql from 'graphql-tag';

export const fetchUsersList = gql`
{
    usersList{
        id
        name,
        likes
    }
}
`;