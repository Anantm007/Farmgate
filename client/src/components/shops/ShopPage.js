import React, {Fragment, useState, useEffect} from 'react'
import {getShop} from '../shops/apiShops';
import Footer from '../layout/Footer';
import { Redirect } from 'react-router-dom';

const ShopPage = (props) => {

    const shopId = props.match.params.id;
    const [shop, setShop] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true);

    const loadShop = () => {
        getShop(shopId).then(data => {
            if(data.success === false)
            {         
                setError(data.message);
                setLoading(true);
            }

            else
            {
                setShop(data.data);
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
        loadShop()
        //eslint-disable-next-line
    }, [])

    return (
      
        loading ? <div>{showLoading()}</div> : (<Fragment>

        <div className="container">

        <div className="row">
    
          <div className="col-lg-4">
    
            <h1 className="my-4">{shop.name}</h1>
            <div>
              Email: <a href={`mailto:${shop.email}`}>{shop.email}</a> <br/>
              Contact No. <a href="#">{shop.phoneNumber}</a><br/><br />
              Address: {shop.address}<br/><br />
              About: {shop.description}<br/>
            </div>
    
          </div>
    
          <div className="col-lg-8">
    
            <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  <img className="d-block img-fluid" src={`/api/shops/photo/${shop._id}`} />
                </div>
                </div>
              
            </div>
    
            <div className="row">
    
              ITEM 1 -  description - price - quality - add to cart<br/>
              ITEM 2 -  description - price - quality - add to cart <br/>
              ITEM 3 -  description - price - quality - add to cart <br/><br/><br/>
              
            </div>
    
          </div>
    
        </div>
    
      </div>
      <Footer/>
      </Fragment>)
    )
}

export default ShopPage
