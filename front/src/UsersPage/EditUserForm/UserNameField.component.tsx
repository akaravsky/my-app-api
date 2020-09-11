import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

export default function UserNameField({ setUserName, userName, error }: { setUserName: Function, userName: string, error?: string }) {
    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserName(e.target.value);
    };

    return (<TextField
        error={Boolean(error)}
        value={userName}
        onChange={handleUserNameChange}
        label="Edit user"
    />)
}