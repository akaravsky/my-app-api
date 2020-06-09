import gql from 'graphql-tag';

export default gql`
    {
        companies {
            name
            id
        }
    }
`;
