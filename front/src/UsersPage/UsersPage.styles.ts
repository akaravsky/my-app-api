import { makeStyles, Theme } from '@material-ui/core';

export const useStylesForUsersPage = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        maxWidth: 360,
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
