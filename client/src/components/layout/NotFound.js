import React from 'react';
import Footer from './Footer';

const NotFound = () => {
    return (
        <div style={{marginTop: '5rem', textAlign: 'center'}}>
            <h1 className="x-large text-primary">
                Error 404 :( <br/><br/>
                <i className="fas fa-exclamation-triangle"></i>Page Not Found
                <br/>
            </h1>

            <p className="large">Sorry, this page does not exist</p>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br/>

            <Footer/>
        </div>
    )
}

export default NotFound
