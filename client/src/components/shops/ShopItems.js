import React, { Fragment, useState } from 'react'
import {addToCart, updateUser} from '../user/apiUser';
import Spinner from '../layout/Spinner';
import {isAuthenticated} from '../userAuth';

const ShopItems = ({item}) => {

    const [values, setValues] = useState({
        success: false,
        error: '',
        loading: false,
    });

    const {success, error, loading} = values;


    const addCart = () => {
        if(!isAuthenticated()) 
        {
            window.location.href = '/user/login'
        }
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
                setTimeout(() => setValues({...values, success: false}), 5000)
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
                    <div className="flip-card-inner" style={{backgroundImage: `url(/api/items/photo/${item._id}`, backgroundSize: '19rem 20rem', borderRadius: '.5em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        
                        <div className="flip-card-front">
                        <h4 style={{  textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff', color: 'black'}}>{item.name}</h4>
                        <span className="badge badge-success badge-pill">{item.quality}</span><br/><br/>
                        {item.inStock && <button className="btn btn-danger" onClick={addCart}>Add to Cart</button>}
                        </div>
                        
                    </div>
                    <br/>
                    <div  style={{backgroundColor: success ? 'none': '', textAlign: 'center', marginTop: '-1em', marginBottom: '1em'}}>
                    <strong>{success ? 
                    '' : error ? '' : '$' + item.price + ' per ' + item.variant}</strong>
                    </div>
                    <p style={{border: success ? 'none': 'solid 1px', textAlign: 'center', borderWidth: 'thin', padding: '0.5em'}}>{success ? 
                    showSuccess() : error ? showError() : item.description}</p>
                    <br/>
                    </div>}

            </div>
        
        </Fragment>
  )
}

export default ShopItems
