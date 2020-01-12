import React, {Fragment} from 'react'
import About1 from '../../images/about1.jpg';
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
                    <p className="lead text-muted mb-0">We are a food delivery service based in Adelaide delivering fresh and quality organic food from various shops.</p>
                </div>
                <div className="col-lg-6 d-none d-lg-block"><img src={About2} alt="img" className="img-fluid" /></div>
                </div>
            </div>
            </div>

            <div className="bg-white py-5">
            <div className="container py-5">
                <div className="row align-items-center mb-5">
                <div className="col-lg-6 order-2 order-lg-1"><i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                    <h2 className="font-weight-light">Chemical Free food</h2>
                    <p className="font-italic text-muted mb-4">If you’re worried about the chemicals you consume on a daily basis and are on the hunt for nice organic stores in Adelaide, we are here for you.</p>
                </div>
                <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img style={{height:"20rem"}} src={About1} alt="img" className="img-fluid mb-4 mb-lg-0" /></div>
                </div>
                <div className="row align-items-center">
                <div className="col-lg-5 px-5 mx-auto"><img src={About3} alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                <div className="col-lg-6">
                    <h2 className="font-weight-light">Delivering from the best stores in the city</h2>
                    <p className="font-italic text-muted mb-4">We have some of our favourite organic and independent brands such as fruits, vegerables, butter and more. </p>
                </div>
                </div>
            </div>
            </div>

        </Fragment>
    );
};

export default AboutUs;
