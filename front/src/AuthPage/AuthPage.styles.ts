import { makeStyles, Theme } from '@material-ui/core';

const useAuthPageStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '420px',
            width: '320px',
            alignItems: 'center'
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
