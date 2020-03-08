import React, { Fragment, useState } from 'react'
import {addToCart, updateUser} from '../user/apiUser';
import Spinner from '../layout/Spinner';

const ShopItems = ({item}) => {

    const [values, setValues] = useState({
        success: false,
        error: '',
        loading: false,
    });

    const {success, error, loading} = values;


    const addCart = () => {
        console.log('yo')
        setValues({...values, loading: true, error: false, success: false});
        addToCart(item._id)
        .then(data => {
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

    const showError = () => {
        return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
        )
    }

    
    const showSuccess = () => {
        return (<div className="alert alert-success" style={{display: success === true ? '': 'none'}}>
            Item added to cart successfully!
        </div>
        )
    }

    const showLoading = () => 
            loading && <Spinner/>


    return (
        <Fragment>
            
            <div className="row">
                
                { loading ? showLoading() : <div className="flip-card" style={{margin: "2rem"}}>
                    <div className="flip-card-inner" style={{backgroundImage: `url(/api/items/photo/${item._id}`}}>
                        
                        <div className="flip-card-front">
                        <h4>{item.name}</h4>
                        <h6>{`$ ${item.price} / ${item.variant}`}</h6>
                        <span className="badge badge-success badge-pill">{item.quality}</span><br/><br/>
                        {item.inStock && <button className="btn btn-danger" onClick={addCart}>Add to Cart</button>}
                        </div>

                        <div className="flip-card-back">
                        </div>
                        
                    </div>
                    <br/>
                    <p style={{backgroundColor: success ? 'none': '#d4f8e8'}}>{success ? showSuccess() : item.description}</p>
                    {showError()}
                    <br/>
                    </div>}

            </div>
        
        </Fragment>
  )
}

export default ShopItems
