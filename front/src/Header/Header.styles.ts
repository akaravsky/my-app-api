import { makeStyles } from '@material-ui/core';

const useStylesForHeader = makeStyles({
    root: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    toolbar: {
        minHeight: '48px'
    }
});

export default useStylesForHeader;
