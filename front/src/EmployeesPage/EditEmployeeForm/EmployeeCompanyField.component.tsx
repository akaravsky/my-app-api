import React, { ChangeEvent } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { Company } from 'common/common.interfaces';

export default function EmployeeCompanyField({
    companies,
    setCompanyId,
    companyId
}: {
    companies?: Array<Company>;
    setCompanyId: Function;
    companyId: string;
}): JSX.Element {
    const handleCompanyNameChange = (
        e: ChangeEvent<HTMLInputElement>
    ): void => {
        setCompanyId(e.target.value);
    };

    return (
        <Select value={companyId} onChange={handleCompanyNameChange}>
            {companies?.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                    {company.name}
                </MenuItem>
            ))}
        </Select>
    );
}
