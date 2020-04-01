import React, { Fragment, useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Footer from '../layout/Footer'
import CartItem from './CartItem';
import {isAuthenticated} from '../userAuth';
import {getCartTotal, checkPromo} from '../user/apiUser';

const UserCart = () => {

  const {user} = isAuthenticated();

  const [values, setValues] = useState({
    shipping: 4.50,
    tax: 0.45,
    subtotal: 0,
    promoCode: '',
    loading: false,
    success:  false,
    error: false,
    total: 0
  });

  const {shipping, tax, subtotal, total, success, error, promoCode, loading} = values;

  const handleChange = name => e => {
    setValues({...values, error: false, [name]: e.target.value})
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({...values, error: false, success: false, loading: true});
    checkPromo({promoCode})
    .then(data => {
        if(data.success === false)
        {
            setValues({...values, error: data.message, success: false, loading: false})
        }
        else
        {
            setValues({...values, shipping: 0, tax: 0, total: subtotal, success: true, error: false, loading: false});
        }
    })

}

  const getValues = () => {
    setValues({...values, loading: true});
    getCartTotal()
    .then(data => {
      if(data.success === true)
      {
        setValues({...values, subtotal: data.data, total: data.data + tax + shipping, loading: false})
      }

      else
      {
        setValues({...values, loading: false})
      }
    })
  }

  const showLoading = () => loading && <Spinner/>

  const showError = () => {
      return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
          {error}
      </div>
      )
  }

  const showSuccess = () => {
      return (<div className="alert alert-success" style={{display: success ? '': 'none'}}>
        Code applied successfully!
      </div>)
  }


  useEffect(() => {
    getValues();
    //eslint-disable-next-line
  }, [])

    return (
        <Fragment>
          <br/>
          <h1 className="text-center">{user.name.split(" ").slice(0,-1)}'s Shopping Cart</h1>
          
          {user.cart.length >= 1 ? user.cart.map((item, i) =>(
                    <div key={i}>    
                        <CartItem item={item} />      
                    </div>
          )): <h1 className="text-center">You do not have any items in your cart</h1>}
          
      <div className="row py-5 p-4 bg-white rounded shadow-sm">
        
        <div className="col-lg-6">
          
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Promotional Code</div>
          <div className="p-4">
            <p className="font-italic mb-4">Please enter any promo code that you have ?</p>
            <input onChange={handleChange('promoCode')} value={promoCode} className="form-control"></input>
            <br/>
            <button style={{textAlign: 'center'}} onClick={clickSubmit} className="btn btn-success btn-block">APPLY!</button>
            <br/>
            {showSuccess()}
            {showError()}
          </div>

          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Delivery Address</div>
          <div className="p-4">
            <p className="font-italic mb-4">Please check your delivery address before proceeding forward</p>
            <textarea name="" cols="30" rows="2" className="form-control" value={user.address} readOnly></textarea>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
          <div className="p-4">
            <p className="font-italic mb-4">Shipping and additional costs are calculated as per the Australian laws.</p>
            <ul className="list-unstyled mb-4">
              {showLoading()}
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal</strong><strong>${subtotal}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>${shipping}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">GST (@10%)</strong><strong>${tax}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong><strong>(AUD) ${total}</strong></li>
            </ul>
            {user.cart.length >= 1 && subtotal > 25 ? <Link to= {{pathname: "/checkout", state: {subtotal: subtotal, total: total, tax: tax, shipping: shipping}}} className="btn btn-dark rounded-pill py-2 btn-block">Proceed to checkout</Link>
           : <Link to="/checkout" className="btn btn-dark rounded-pill py-2 btn-block disabled">Proceed to checkout</Link>}
           {subtotal <= 25 ? 'Min. subtotal amount allowed to checkout is $25' : ''} 
          </div>
        </div>

      </div>

          <Footer />  
        </Fragment>
    )
}

export default withRouter(UserCart)
