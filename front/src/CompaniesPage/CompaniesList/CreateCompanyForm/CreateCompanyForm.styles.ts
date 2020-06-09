import { Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        maxWidth: 360,
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
}));
