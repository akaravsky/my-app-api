import gql from 'graphql-tag';

export default gql`
{
    usersList{
        id
        firstName
    }
}
`;