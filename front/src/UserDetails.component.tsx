import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { TextField } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'

        },
        container: {
            maxWidth: 360,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        }
    }),
);

const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      firstName
      age
    }
  }
`;

const UserDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    const { loading, error, data = { user: {} } } = useQuery<any>(GET_USER, {
        variables: {id: Number(id)},
    })
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>{`Error! ${error}`}</div>;
      
    return (
        <div className={classes.root}>
            {<form className={classes.container}>
                <TextField value={data.user.firstName} label="Name" />
                <TextField value={data.user.age} label="Age" />
            </form>}
        </div>
    )

}

export default UserDetails;
