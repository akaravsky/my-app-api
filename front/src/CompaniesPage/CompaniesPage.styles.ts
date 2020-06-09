import { makeStyles, Theme } from '@material-ui/core';

const useStylesForCompaniesPage = makeStyles((theme: Theme) => ({
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

export default useStylesForCompaniesPage;
