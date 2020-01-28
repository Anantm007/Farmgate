import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Carousel from './Carousel';
import ShopsCard from './ShopsCard'
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Footer from '../layout/Footer'

import {getShops} from '../shops/apiShops';
import Spinner from './Spinner';

const Landing = () => {

    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true);

    const loadShops = () => {
        getShops().then(data => {
            if(data.success === false)
            {
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
        loading && <Spinner/>
    )

    useEffect(() => {
        loadShops()
        //eslint-disable-next-line
    }, [])



    return (
        <Fragment>
            
          <div className="alert alert-success alert-dismissible fade show" style={{marginBottom: '0rem'}} role="alert"> 
              <strong>ARE YOU A SHOP OWNER / FARMER? <Link to="/shop/login">&nbsp; Register / Login Now!</Link></strong> 
              <button type="button" className="btn close" 
                  data-dismiss="alert" aria-label="Close">           
                  <span aria-hidden="true">×</span> 
              </button> 
          </div> 

            <Carousel />
            
            <h1 style={{textAlign:'center', marginTop: '4rem'}}>OUR SHOPS</h1>
            {showLoading()}
            <div className="row">                
                {shops.map((shop, i) =>(
                    <div key={i} className="col-xs-12 col-sm-6 col-md-4">    
                        <ShopsCard shop={shop} />      
                    </div>
                ))}
            </div>
              
            <AboutUs />
            <ContactUs />
            <Footer />
        </Fragment>
    )
}

export default Landing
