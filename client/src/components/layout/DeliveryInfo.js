import React, {Fragment} from 'react'
import About3 from '../../images/about3.jpg';


const DeliveryInfo = () => {
    return (
        <Fragment>
            <div className="bg-light">
            <div className="container py-5">
                <div className="row align-items-center">
                <div className="col-lg-5 px-5 mx-auto"><img src={About3} alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                <div className="col-lg-6">
                    <h2 className="font-weight-light">We deliver from the farm gate to your door step</h2>
                    <p className="font-italic text-muted mb-4">Adelaide Metropolitan and outer Metropolitan areas only 
                    (see the terms & conditions linked below for a definition of the Service Area) </p>
                </div>
                </div>
            </div>
            </div>

        </Fragment>
    );
};

export default DeliveryInfo;
