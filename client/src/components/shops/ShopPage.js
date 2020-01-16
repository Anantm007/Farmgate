import React, {Fragment, useState, useEffect} from 'react'
import {getShop} from '../shops/apiShops';
import Footer from '../layout/Footer';
import Spinner from '../layout/Spinner';
import ShopItems from './ShopItems';

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
        loading && <Spinner />
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
    
            
            <h4>Shop Items Available</h4>
            <br/>
            <ShopItems/>              
            
          </div>
    
        </div>
    
      </div>
      
<br/><br/>
<br/><br/>
      <Footer/>
      </Fragment>)
    )
}

export default ShopPage
