import React, { ChangeEvent, FormEvent } from 'react';

import { graphql } from 'graphql';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { TextField } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

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

const CreateUserForm = (props: any) => {
    const classes = useStyles();
    const [addUser, { data }] = useMutation(mutation);
    const [value, setValue] = React.useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault
        addUser({variables:{firstName: value}});
        //setValue('');
    }

    return (
        <div className={classes.root}>
            <form className={classes.container} onSubmit={handleSubmit}>
                <TextField value={value} onChange={handleChange} label="New user" />
            </form>
        </div>
    )
}

const mutation = gql`
    mutation AddUser($firstName: String!) {
        addUser(firstName: $firstName){
            firstName
        }
    }
`;

export default CreateUserForm;
