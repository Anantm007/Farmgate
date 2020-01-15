import React, {Fragment, useState, useEffect} from 'react'
import {getShops} from '../shops/apiShops';
import ShopsDetailCard from './ShopsDetailCard';
import Footer from '../layout/Footer';
const Shops = () => {
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
        loading ? <div>{showLoading()}</div> : (<Fragment>            
            <h1 style={{textAlign:'center', marginTop: '4rem'}}>OUR SHOPS</h1>
            
            {showLoading()}
            
            <div className="row shop-container container-fluid">                
                {shops.map((shop, i) =>(
                    <div key={i} className="col-sm-4">    
                        <ShopsDetailCard shop={shop} />      
                    </div>
                ))}
            </div>
              <Footer />
        </Fragment>)
    )}
            
            
export default Shops
