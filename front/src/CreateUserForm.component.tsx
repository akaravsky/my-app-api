import React, { ChangeEvent, FormEvent } from 'react';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { TextField } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { fetchUsersList } from 'common/common.queries';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        },
        container: {
            maxWidth: 360,
            width: '100%',
            backgroundColor: theme.palette.background.paper
        }
    })
);

const mutation = gql`
    mutation AddUser($name: String!) {
        addUser(name: $name) {
            name
        }
    }
`;

interface Props {
    setTab: Function;
}

const CreateUserForm = (props: Props): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const [addUser, { error }] = useMutation(mutation);
    const [value, setValue] = React.useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        await addUser({
            variables: { name: value },
            refetchQueries: [{ query: fetchUsersList }]
        });
        history.push('/users');
        props.setTab(1);
    };
    return (
        <div className={classes.root}>
            <form className={classes.container} onSubmit={handleSubmit}>
                <TextField
                    error={Boolean(error)}
                    helperText={error?.message}
                    value={value}
                    onChange={handleChange}
                    label="New user"
                />
            </form>
        </div>
    );
};

export default CreateUserForm;
