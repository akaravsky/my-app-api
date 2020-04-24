import { makeStyles, Theme } from '@material-ui/core';

const useStylesForUsersPage = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        maxWidth: 450,
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    fabAddContainer: {
        display: 'flex',
        '& > button': {
            marginLeft: 'auto'
        }
    }
}));

export default useStylesForUsersPage;
