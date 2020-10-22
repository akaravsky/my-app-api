import { Button, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import useSignup from './hooks/useSignup';
import useStylesForSigninForm from './SignupForm.styles';

const SigninForm = (): JSX.Element => {
    const classes = useStylesForSigninForm();

    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const { signup, error } = useSignup(email, password);

    const handleChangeEmail = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        setEmail(event?.target.value);
    };

    const handleChangePassword = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        setPassword((event?.target as HTMLTextAreaElement).value);
    };

    return (
        <form className={classes.form} autoComplete="off">
            <TextField
                error={Boolean(error)}
                helperText={error}
                value={email}
                onChange={handleChangeEmail}
                id="email"
                label="Email"
                variant="outlined"
            />
            <TextField
                error={Boolean(error)}
                helperText={error}
                value={password}
                onChange={handleChangePassword}
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                autoComplete="current-password"
            />
            <Button variant="contained" color="primary" onClick={signup}>
                Sign up
            </Button>
        </form>
    );
};

export default SigninForm;
