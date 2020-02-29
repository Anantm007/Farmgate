import React, {Fragment} from 'react'
import About2 from '../../images/about2.jpg';
import About3 from '../../images/about3.jpg';


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

            <div className="bg-white py-5">
            <div className="container py-5">
                <div className="row align-items-center">
                <div className="col-lg-5 px-5 mx-auto"><img src={About3} alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                <div className="col-lg-6">
                    <h2 className="font-weight-light">We deliver from the farm gate to your door step</h2>
                    <p className="font-italic text-muted mb-4">Adelaide metropolitan areas only </p>
                </div>
                </div>
            </div>
            </div>

        </Fragment>
    );
};

export default AboutUs;
