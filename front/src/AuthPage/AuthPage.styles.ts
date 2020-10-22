import { makeStyles, Theme } from '@material-ui/core';

const useAuthPageStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            width: '320px',
            height: '300px',
            padding: '20px'
        }
    };
});

export default useAuthPageStyles;
