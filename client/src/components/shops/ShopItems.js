import React, { Fragment, useState, useEffect } from 'react'
import {addToCart, updateUser} from '../user/apiUser';

const ShopItems = ({item}) => {

    const [values, setValues] = useState({
        success: false,
        error: '',
        loading: false,
    });

    const {success, error, loading} = values;


    const addCart = () => {
        setValues({...values, loading: true, error: '', success: false});
        addToCart(item._id)
        .then(data => {
            console.log(data)
            if(data.success === false)
            {
                setValues({...values, success: false, error: data.message, loading: false});
            }

            else
            {
                updateUser(data.data, () => {
                    setValues({...values, success: true, error: false, loading: false});
                })
            }
        })
    }


    return (
        <Fragment>
            
            <div class="row">
                
                <div class="flip-card" style={{margin: "2rem"}}>
                    <div class="flip-card-inner" style={{backgroundImage: `url(/api/items/photo/${item._id}`}}>
                        
                        <div class="flip-card-front">
                        <h4>{item.name}</h4>
                        <h6>{`$ ${item.price} / ${item.variant}`}</h6>
                        {item.inStock ? <span className="badge badge-primary badge-pill">In Stock</span> : <span className="badge badge-danger badge-pill">Out of Stock</span>} <br/><br/>
                        {item.inStock && <button className="btn btn-danger" onClick={addCart}>Add to Cart</button>}
                        </div>

                        <div class="flip-card-back">
                        <p>{item.description}</p>
                        <span className="badge badge-success badge-pill">{item.quality}</span><br/><br/>
                        {item.inStock && <button className="btn btn-danger" onClick={addCart}>Add to Cart</button>}
                        </div>
                        
                    </div>
                </div>

            </div>
        
        </Fragment>
  )
}

export default ShopItems
