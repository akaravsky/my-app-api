import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'calc(100vh - 65px)'
    },
    clickLabel: {
        cursor: 'pointer'
    }
});

const fetchLikes = gql`
{
    likes
}
`;

const mutation = gql`
mutation {
    like
}
`;

const About = () => {
    const [about, setAbout] = React.useState('')
    const classes = useStyles();

    const { loading, data, refetch } = useQuery<any>(fetchLikes);
    const [like] = useMutation(mutation);

    /*const onClick = () => {
        setAbout('Loading...')
        fetch('http://localhost:3000/about/ab').then(res => res.json()).then(res => {
            console.log(res);
            setAbout(res.text);
        })
    }*/

    const onClickAbout = async () => {
        setAbout('Loading...')
        const res = await fetch('http://localhost:3000/about/ab')
        const json = await res.json();
        setAbout(json.text);
    }

    const onClickThumb = async () => {
        await like(); 
        refetch()
    }
    console.log(data);
    return (
        <div className={classes.root}>
            <div className={classes.clickLabel} onClick={onClickAbout}>Click to load 'about'</div>
            <ThumbUpIcon className={classes.clickLabel} onClick={onClickThumb} />
            <div>{about}</div>
            <div>{loading ? 'loading...' : data.likes}</div>
        </div>)
}

export default About;