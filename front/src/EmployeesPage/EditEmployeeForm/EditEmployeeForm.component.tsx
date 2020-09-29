import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import useHandleSubmit from './hooks/useHandleSubmit';
import EmployeeNameField from './EmployeeNameField.component';
import EmployeeCompanyField from './EmployeeCompanyField.component';
import useFetchEmployee from './hooks/useFetchEmployee';
import useFetchCompanies from './hooks/useFetchCompanies';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 250,
            width: '100%',
            backgroundColor: theme.palette.background.paper
        }
    })
);

interface Props {
    setTab: Function;
}

const EditEmployeeForm = ({ setTab }: Props): JSX.Element => {
    const classes = useStyles();
    const [employeeName, setEmployeeName] = React.useState<string>('');
    const [companyId, setCompanyId] = React.useState<string>('');
    const [handleSubmit, submitError] = useHandleSubmit(employeeName, companyId, setTab);
    const { employee, loading: employeeLoading, error: employeeError } = useFetchEmployee();
    const { companies } = useFetchCompanies();
    const initCompanyId = employee?.company?.id;
    

    React.useEffect(() => {
        if(!employee.name) return
        setEmployeeName(employee.name);
    }, [employee.name]);

    React.useEffect(() => {
        if(initCompanyId) {
            setCompanyId(initCompanyId);
        }
    }, [initCompanyId]);

    if (employeeLoading) return <div>Loading...</div>;
    if (employeeError || submitError) return <div>{`Error! ${employeeError || submitError}`}</div>;

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <EmployeeNameField setEmployeeName={setEmployeeName} employeeName={employeeName} error={employeeError}/>
                <EmployeeCompanyField companies={companies} setCompanyId={setCompanyId} companyId={companyId}/>
            </form>
        </div>
    );
};

export default EditEmployeeForm;
