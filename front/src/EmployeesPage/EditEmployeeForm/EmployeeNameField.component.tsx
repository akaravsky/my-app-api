import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

export default function EmployeeNameField({ setEmployeeName, employeeName, error }: { setEmployeeName: Function, employeeName: string, error?: string }) {
    const handleEmployeeNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmployeeName(e.target.value);
    };

    return (<TextField
        error={Boolean(error)}
        value={employeeName}
        onChange={handleEmployeeNameChange}
        label="Edit employee"
    />)
}