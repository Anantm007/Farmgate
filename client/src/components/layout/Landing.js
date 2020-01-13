import React, {Fragment, useState, useEffect} from 'react';
import Carousel from './Carousel';
import ShopsCard from './ShopsCard'
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

import {getShops} from '../shops/apiShops';

const Landing = () => {

    const [shops, setShops] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true);

    const loadShops = () => {
        getShops().then(data => {
            if(data.success === false)
            {
                setError(data.message);
                console.log(error);
                setLoading(false);
            }

            else
            {
                setShops(data.data);
                setLoading(false);
            }
        })
    }

    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Loading...</h2>
        </div>)
    )

    useEffect(() => {
        loadShops()
        //eslint-disable-next-line
    }, [])



    return (
        <Fragment>
            <Carousel />
            
            <h1 style={{textAlign:'center', marginTop: '4rem'}}>OUR SHOPS</h1>
            
            {showLoading()}
            <div className="row shop-container container-fluid">                
                {shops.map((shop, i) =>(
                    <div key={i} className="col-sm-3">    
                        <ShopsCard shop={shop} />      
                    </div>
                ))}
            </div>
              
            <AboutUs />
            <ContactUs />
        </Fragment>
    )
}

export default Landing
