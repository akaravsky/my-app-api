import React, { ChangeEvent } from 'react';
import { Select, MenuItem } from '@material-ui/core';

export default function UserCompanyField({ setCompanyName, companyName }: { setCompanyName: Function, companyName: string}) {
    const handleCompanyNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCompanyName(e.target.value);
    };

    return (
        <Select value={companyName} onChange={handleCompanyNameChange}>
            <MenuItem value={10}>Ten</MenuItem>
        </Select>
    )
}