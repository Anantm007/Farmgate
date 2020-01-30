import React, { Fragment, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Footer from '../layout/Footer'
import {isAuthenticated} from '../userAuth';
import {getCartTotal} from '../user/apiUser';

const Checkout = () => {

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
          <h1 className="text-center">Checkout Page</h1>
        
        <div className="row py-5 p-4 bg-white rounded shadow-sm">
        
        <div className="col-lg-6">
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
          <div className="p-4">
            <ul className="list-unstyled mb-4">
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total Items</strong><strong>{user.cart.length}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Deliver To</strong><strong>{user.name}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Delivery Address</strong><strong>{user.address}</strong></li>
              {showLoading()}
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal</strong><strong>${subtotal}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>${shipping}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">GST (@10%)</strong><strong>${tax}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong><strong>${total}</strong></li>
            </ul>
          </div>
        </div>

      </div>

          <Footer />  
        </Fragment>
    )
}

export default Checkout
