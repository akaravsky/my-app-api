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
    likes {
        id
        myLikes
    }
}
`;

const mutation = gql`
mutation {
    addLikes(id: 111){
        myLikes,
        id
    }
}
`;

const About = () => {
    const [about, setAbout] = React.useState('')
    const classes = useStyles();

    const { loading, data: initData } = useQuery<any>(fetchLikes);
    const [like, {data: dataAfterMutation}] = useMutation(mutation);

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

    const onClickThumb = (likesBeforeClick:any) => {
        like({
            optimisticResponse: {
                __typename: 'Mutation',
                addLikes: {
                    __typename: 'Likes1',
                    id:111,
                    myLikes: likesBeforeClick?.myLikes + 1 // for imidiate update
                }
            }
        });
        //refetch()
    }
    if(loading){
        return null
    }

    console.log(dataAfterMutation, initData)

    return (
        <div className={classes.root}>
            <div className={classes.clickLabel} onClick={onClickAbout}>Click to load 'about'</div>
            <ThumbUpIcon className={classes.clickLabel} onClick={() => onClickThumb(dataAfterMutation?.likes ?? initData?.likes)} />
            <div>{about}</div>
            <div>{dataAfterMutation?.likes?.myLikes ?? initData?.likes?.myLikes}</div>
        </div>)
}

export default About;