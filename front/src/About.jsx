import React from 'react';

const About = () => {
    const [about, setAbout] = React.useState('')

    /*const onClick = () => {
        setAbout('Loading...')
        fetch('http://localhost:3000/about/ab').then(res => res.json()).then(res => {
            console.log(res);
            setAbout(res.text);
        })
    }*/

    const onClick = async () => {
        setAbout('Loading...')
        const res = await fetch('http://localhost:3000/about/ab')
        const json = await res.json();
        setAbout(json.text);
    }

    return (
        <div>
            <div className='button' onClick={onClick}> Click here</div>
            {about}
        </div>)
}

export default About;