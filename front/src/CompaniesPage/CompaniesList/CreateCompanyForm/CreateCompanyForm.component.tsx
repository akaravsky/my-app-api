import React, { ChangeEvent } from 'react';

import { TextField } from '@material-ui/core';

import { useStyles } from './CreateCompanyForm.styles';
import { CreateCompanyFormProps } from './CreateCompanyForm.interfaces';
import { useHandleSubmit } from './CreateCompanyForm.hooks';

const CreateCompanyForm = (props: CreateCompanyFormProps): JSX.Element => {
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
                    label="New company"
                />
            </form>
        </div>
    );
};

export default CreateCompanyForm;
