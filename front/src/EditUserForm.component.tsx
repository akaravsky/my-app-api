import React, { ChangeEvent, FormEvent } from 'react';

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { TextField } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import fetchUsersList from 'queries/fetchUsersList';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'

        },
        container: {
            maxWidth: 360,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        }
    }),
);

const GET_USER = gql`
  query User($id: String!) {
    user(id: $id) {
      name
      age
    }
  }
`;


const mutation = gql`
    mutation EditUser($name: String!, $id: String!) {
        updateUser(name: $name, id: $id){
            name,
            id
        }
    }
`;

const EditUserForm = (props: any) => {
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const [editUser] = useMutation(mutation);

    const { loading, error, data: { user } = { user: {} } } = useQuery<any>(GET_USER, {
        variables: { id },
    })

    const [formName, setFormName] = React.useState<string>('');

    React.useEffect(() => {
        setFormName(user.name)
    }, [user.name])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormName(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editUser({
            variables: { name: formName, id: id },
            refetchQueries: [{ query: fetchUsersList }]
        });
        history.push('/users')
        props.setTab(1);
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{`Error! ${error}`}</div>;

    return (
        <div className={classes.root}>
            <form className={classes.container} onSubmit={handleSubmit}>
                <TextField value={formName} onChange={handleChange} label="Edit user" />
            </form>
        </div>
    )

}

export default EditUserForm;
