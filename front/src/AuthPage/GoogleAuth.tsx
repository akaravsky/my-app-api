import React from 'react';
import GoogleButton from 'react-google-button';

const GoogleAuth = (): JSX.Element => {
    return (
        <a style={{ textDecoration: 'none' }} href="auth/google">
            <GoogleButton style={{ outline: 'none' }} />
        </a>
    );
};

export default GoogleAuth;
