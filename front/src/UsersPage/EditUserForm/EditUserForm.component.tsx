import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import useHandleSubmit from './hooks/useHandleSubmit';
import UserNameField from './UserNameField.component';
import UserCompanyField from './UserCompanyField.component';
import useFetchUser from './hooks/useFetchUser';
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

const EditUserForm = ({ setTab }: Props): JSX.Element => {
    const classes = useStyles();
    const [userName, setUserName] = React.useState<string>('');
    const [companyId, setCompanyId] = React.useState<string>('');
    const [handleSubmit, submitError] = useHandleSubmit(userName, companyId, setTab);
    const { user, loading: userLoading, error: userError } = useFetchUser();
    const { companies, loading: companiesLoading, error: companiesError } = useFetchCompanies();
    const initCompanyId = user?.company?.id;
    

    React.useEffect(() => {
        if(!user.name) return
        setUserName(user.name);
    }, [user.name]);

    React.useEffect(() => {
        if(initCompanyId) {
            setCompanyId(initCompanyId);
        }
    }, [initCompanyId]);

    if (userLoading) return <div>Loading...</div>;
    if (userError || submitError) return <div>{`Error! ${userError || submitError}`}</div>;

    console.log('user', user)

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <UserNameField setUserName={setUserName} userName={userName} error={userError}/>
                <UserCompanyField companies={companies} setCompanyId={setCompanyId} companyId={companyId}/>
            </form>
        </div>
    );
};

export default EditUserForm;
