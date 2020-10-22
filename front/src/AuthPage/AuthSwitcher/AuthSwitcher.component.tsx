import { Grid, makeStyles, Switch, Theme, Typography } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

const useStyles = makeStyles((theme: Theme) => {
    return {
        switchBase: {
            color: theme.palette.primary.main,
            '&$checked': {
                color: theme.palette.secondary.main
            },
            '&$checked + $track': {
                backgroundColor: theme.palette.secondary.main
            }
        },
        track: {
            backgroundColor: theme.palette.primary.main,
            opacity: 0.5
        }
    };
});

const AuthSwitcher = (props: {
    onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}): JSX.Element => {
    const classes = useStyles();
    return (
        <Typography>
            <Grid
                component="label"
                container
                justify="center"
                alignItems="center"
                spacing={1}
            >
                <Grid item>Sign in</Grid>
                <Grid item>
                    <Switch
                        classes={{
                            switchBase: classes.switchBase,
                            track: classes.track
                        }}
                        name="authSwitcher"
                        onChange={props.onChange}
                    />
                </Grid>
                <Grid item>Login</Grid>
            </Grid>
        </Typography>
    );
};

export default AuthSwitcher;
