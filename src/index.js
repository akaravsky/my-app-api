import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
    return (
        <div>
            <div>Hello01</div>
            <img src="http://lorempixel.com/400/400" />
        </div>

    )
}

ReactDOM.render(<App />, document.getElementById('app'))