import React, { Fragment, useState, useEffect } from 'react'
import Spinner from '../layout/Spinner';
import {getItems} from '../shops/apiShops';
import ShopItems from './ShopItems';
import Footer from '../layout/Footer';

const AdminShop = (props) => {

    const shopId = props.match.params.id;
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true);

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
      error && <h3 className="text-center" style={{color: 'red'}}>{error}</h3>
    ) 


    useEffect(() => {
        loadItems()
        //eslint-disable-next-line
    }, [])



    return (
        loading ? <div>{showLoading()}</div> : (<Fragment>
                <h1 className="text-center">Shop Items</h1>
                {showError()}
                <div className="row">                
                {items.length && items.map((item, i) =>(
                    <div key={i} className="col-xs-12 col-sm-6 col-md-6 ">    
                        <ShopItems item={item} />
                        <br/>      
                    </div>
                ))}
                </div>
                
                <Footer />

            </Fragment>)
    )
}

export default AdminShop