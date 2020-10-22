import { Paper } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import useAuthPageStyles from './AuthPage.styles';
import AuthSwitcher from './AuthSwitcher/AuthSwitcher.component';
import LoginForm from './LoginForm/LoginForm.component';
import SigninForm from './SignupForm/SignupForm.component';

enum AUTH_TYPE {
    LOGIN = 'login',
    SIGNIN = 'signin'
}

const AuthPage = (): JSX.Element => {
    const classes = useAuthPageStyles();
    const [authType, setAuthType] = React.useState<AUTH_TYPE>(AUTH_TYPE.SIGNIN);

    const handleSwitch = (
        event: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        if (checked) {
            setAuthType(AUTH_TYPE.LOGIN);
        } else {
            setAuthType(AUTH_TYPE.SIGNIN);
        }
    };
    return (
        <div className={classes.container}>
            <Paper classes={{ root: classes.paper }}>
                <AuthSwitcher onChange={handleSwitch} />
                {authType === AUTH_TYPE.LOGIN ? <LoginForm /> : <SigninForm />}
            </Paper>
        </div>
    );
};

export default AuthPage;
