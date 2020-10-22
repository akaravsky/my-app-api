import { makeStyles, Theme } from '@material-ui/core';

const useStylesForLoginForm = makeStyles((theme: Theme) => ({
    form: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%'
    }
}));

export default useStylesForLoginForm;
