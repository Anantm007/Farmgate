import React, {Fragment, useState, useEffect} from 'react'
import {getShop, getItems} from '../shops/apiShops';
import Footer from '../layout/Footer';
import Spinner from '../layout/Spinner';
import ShopItems from './ShopItems';

const ShopPage = (props) => {

    const shopId = props.match.params.id;
    const [shop, setShop] = useState([]);
    const [items, setItems] = useState([]);
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

    
    const loadItems = () => {
      getItems(shopId).then(data => {
        console.log(data)
          if(data.success === false)
          {         
              setError(data.message);
              setLoading(true);
          }

          else
          {
            if(data.count === 0)
                {
                    setError(data.message)
                }
                else {
                    setItems(data.data);
                }
            setLoading(false);
          }
      })
  }

    const showLoading = () => (
        loading && <Spinner />
    )

    const showError = () => (
      error && <h3 className="text-center">{error}</h3>
    ) 


    useEffect(() => {
        loadShop()
        loadItems()
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
    
            <br/><br/>
            <h3>Shop Items Available</h3>
            {showError()}
            <br/>
            <div className="row">                
                {items.length && items.map((item, i) =>(
                    <div key={i} className="col-xs-12 col-sm-6 col-md-6 ">    
                        <ShopItems item={item} />
                        <br/>      
                    </div>
                ))}
            </div>
               
            
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
