import React, { ChangeEvent } from 'react';

import { TextField } from '@material-ui/core';

import { useStyles } from './CreateUserForm.styles';
import { CreateUserFormProps } from './CreateUserForm.interfaces';
import { useHandleSubmit } from './CreateUserForm.hooks';

const CreateUserForm = (props: CreateUserFormProps): JSX.Element => {
    const classes = useStyles();
    const [value, setValue] = React.useState<string>('');
    const [handleSubmit, error] = useHandleSubmit(value, props.setTab);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    };

    return (
        <div className={classes.root}>
            <form className={classes.container} onSubmit={handleSubmit}>
                <TextField
                    error={Boolean(error)}
                    helperText={error}
                    value={value}
                    onChange={handleChange}
                    label="New user"
                />
            </form>
        </div>
    );
};

export default CreateUserForm;
