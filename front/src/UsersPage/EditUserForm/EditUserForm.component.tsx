import React, { ChangeEvent } from 'react';
import { TextField, Select, MenuItem } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import useHandleSubmit from './hooks/useHandleSubmit';
import fetchUserQuery from 'common/queries/fetchUser.query';
import UserNameField from './UserNameField.component';
import UserCompanyField from './UserCompanyField.component';
import useFetchUser from './hooks/useFetchUser';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        },
        container: {
            maxWidth: 360,
            width: '100%',
            backgroundColor: theme.palette.background.paper
        }
    })
);

interface Props {
    setTab: Function;
}

interface User {
    name: string;
    company: {
        name: string;
    };
}

const EditUserForm = ({ setTab }: Props): JSX.Element => {
    const classes = useStyles();
    const [userName, setUserName] = React.useState<string>('');
    const [companyName, setCompanyName] = React.useState<string>('');
    const [handleSubmit, submitError] = useHandleSubmit(userName, setTab);
    const { user, loading, error } = useFetchUser();
    const initCompanyName = user?.company?.name;
    

    React.useEffect(() => {
        if(!user.name) return
        setUserName(user.name);
    }, [user.name]);

    React.useEffect(() => {
        if(initCompanyName) {
            setCompanyName(initCompanyName);
        }
    }, [initCompanyName]);

    if (loading) return <div>Loading...</div>;
    if (error || submitError) return <div>{`Error! ${error || submitError}`}</div>;

    return (
        <div className={classes.root}>
            <form className={classes.container} onSubmit={handleSubmit}>
                <UserNameField setUserName={setUserName} userName={userName} error={error}/>
                <UserCompanyField setCompanyName={setCompanyName} companyName={companyName}/>
            </form>
        </div>
    );
};

export default EditUserForm;
