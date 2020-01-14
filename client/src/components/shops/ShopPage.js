import React, {Fragment, useState, useEffect} from 'react'
import Notfound from '../layout/NotFound';
import {getShop} from '../shops/apiShops';

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
                console.log(error);
                setLoading(false);
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
        <Fragment>
                      {showLoading()}

        <div class="container">

        <div class="row">
    
          <div class="col-lg-4">
    
            <h1 class="my-4">{shop.name}</h1>
            <div>
              Email: <a href="#" class="">{shop.email}</a> <br/>
              Contact No. <a href="#" class="">{shop.phoneNumber}</a><br/><br />
              Address: {shop.address}<br/><br />
              About: {shop.description}<br/>
            </div>
    
          </div>
    
          <div class="col-lg-8">
    
            <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                  <img class="d-block img-fluid" src={`/api/shops/photo/${shop._id}`} />
                </div>
                </div>
              
            </div>
    
            <div class="row">
    
              ITEM 1 -  description - price - quality - add to cart<br/>
              ITEM 2 -  description - price - quality - add to cart <br/>
              ITEM 3 -  description - price - quality - add to cart <br/><br/><br/>
              
            </div>
    
          </div>
    
        </div>
    
      </div>
      </Fragment>
    )
}

export default ShopPage
