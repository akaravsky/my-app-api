import React, { ComponentType } from 'react';
import gql from 'graphql-tag';
import { graphql, DataProps, MutateProps } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';

interface IQuery {
    usersList: Array<IUser>
}

interface IUser {
    firstName: string,
    id: number
}

const query = gql`
{
    usersList{
        id
        firstName
    }
}
`;

const UsersList = (props: any) => {
    const { loading, data = { usersList: [] } } = useQuery<IQuery>(query)
    if (loading) {
        return (<div>Loading...</div>)
    }

    console.log(data);

    return (
        <div>
            {data.usersList.map((user: IUser) => (
                <div key={user.id}>
                    <img src="http://lorempixel.com/50/50" style={{ width: '30px', height: '30px' }} />
                    <span>{user.firstName}</span>
                </div>
            ))}
        </div>
    )
}

export default UsersList;
