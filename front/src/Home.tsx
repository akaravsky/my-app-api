import React from 'react';
import { RouteComponentProps } from '@reach/router';

export interface HomeProps extends RouteComponentProps {
    props1: string;
    props2: number;
}

const Home = (props: HomeProps): JSX.Element => {
    return (
        <div>
            {props.props1}
            {props.props2}
        </div>
    );
};

export default Home;
