import React, { ChangeEvent, FormEvent } from 'react';

import { graphql } from 'graphql';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { TextField } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

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

const mutation = gql`
    mutation AddUser($firstName: String!) {
        addUser(firstName: $firstName){
            firstName
        }
    }
`;

const CreateUserForm = (props: any) => {
    const classes = useStyles();
    const history = useHistory();
    const [addUser, { data }] = useMutation(mutation);
    const [value, setValue] = React.useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addUser({ variables: { firstName: value } });
        history.push('/users')
        props.setTab(1);
    }
    return (
        <div className={classes.root}>
            <form className={classes.container} onSubmit={handleSubmit}>
                <TextField value={value} onChange={handleChange} label="New user" />
            </form>
        </div>
    )

}

export default CreateUserForm;
