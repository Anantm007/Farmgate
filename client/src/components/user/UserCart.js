import React, { Fragment, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Footer from '../layout/Footer'
import CartItem from './CartItem';
import {isAuthenticated} from '../userAuth';
import {getCartTotal} from '../user/apiUser';

const UserCart = () => {

  const {user} = isAuthenticated();

  const [values, setValues] = useState({
    shipping: 4.50,
    tax: 0.45,
    subtotal: 0,
    loading: false,
    total: 0
  });

  const {shipping, tax, subtotal, total, loading} = values;

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

  useEffect(() => {
    getValues();
    //eslint-disable-next-line
  }, [])

  const showLoading = () =>      
    loading && <Spinner/>

    return (
        <Fragment>
          <br/>
          <h1 className="text-center">{user.name.split(" ").slice(0,-1)}'s Shopping Cart</h1>
          {user.cart.map((item, i) =>(
                    <div key={i}>    
                        <CartItem item={item} />      
                    </div>
          ))}
      <div className="row py-5 p-4 bg-white rounded shadow-sm">
        
        <div className="col-lg-6">
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for the seller</div>
          <div className="p-4">
            <p className="font-italic mb-4">If you have some information for the seller/delivery you can leave them in the box below</p>
            <textarea name="" cols="30" rows="2" className="form-control"></textarea>
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
            <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
            <ul className="list-unstyled mb-4">
              {showLoading()}
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal</strong><strong>${subtotal}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>${shipping}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">GST (@10%)</strong><strong>${tax}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong><strong>${total}</strong></li>
            </ul><Link to="/checkout" className="btn btn-dark rounded-pill py-2 btn-block">Proceed to checkout</Link>
          </div>
        </div>

      </div>

          <Footer />  
        </Fragment>
    )
}

export default UserCart
