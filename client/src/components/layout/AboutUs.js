import React, {Fragment} from 'react'
import About2 from '../../images/about2.jpg';

const AboutUs = () => {
    return (
        <Fragment>
        
            <div className="bg-light">
            <div className="container py-5">
                <div className="row h-300 align-items-center py-5">
                <div className="col-lg-6">
                    <h1 className="display-4">About Us</h1>
                    <p className="lead text-muted mb-0">Trading as Farmgate Ag, we are an IT company connecting farmers with consumers by delivering a Point Of Sale and solution package to local farmers, in order to take produce from the farm gate to the consumer door step.</p><br/>
                    <p className="lead text-muted mb-0">In this age of decentralisation, our aim is to deliver high quality produce, that is as fresh as practically possible to the consumer, that is marketed at a competitive price point, and service driven for the consumer.</p>
                </div>
                <div className="col-lg-6 d-none d-lg-block"><img src={About2} alt="img" className="img-fluid" /></div>
                </div>
            </div>
            </div>

        </Fragment>
    );
};

export default AboutUs;
