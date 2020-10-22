import { Button, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { useLogin } from './hooks';
import useStylesForLoginForm from './LoginForm.styles';

const LoginForm = (): JSX.Element => {
    const classes = useStylesForLoginForm();

    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const { login, error } = useLogin(email, password);

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
                value={email}
                onChange={handleChangeEmail}
                helperText={error}
                id="email"
                label="Email"
                variant="outlined"
            />
            <TextField
                error={Boolean(error)}
                value={password}
                onChange={handleChangePassword}
                helperText={error}
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                autoComplete="current-password"
            />
            <Button variant="contained" color="secondary" onClick={login}>
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
