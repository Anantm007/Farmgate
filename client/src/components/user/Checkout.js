import React, { Fragment, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Footer from '../layout/Footer'
import {isAuthenticated} from '../userAuth';
import {getBraintreeClientToken, processPayment, emptyCart, updateUser} from '../user/apiUser';
import DropIn from 'braintree-web-drop-in-react';
import { withRouter } from 'react-router-dom';

const Checkout = (props) => {

  const {user} = isAuthenticated();

  const check = () => {
    if(!props.location.state)
    {
      window.location = `/cart`;
    }
  }

  const [values, setValues] = useState({
    shipping: 4.50,
    tax: 0.45,
    subtotal: props.location.state ? props.location.state.subtotal: 0,
    loading: false,
    instructions: '',
    clientToken: null,
    instance: {},
    success: false,
    error: '',
    total: 0
  });

  const {shipping, tax, instructions, subtotal, instance, clientToken, success, error, loading} = values;

  const handleChange = name => e => {
    setValues({...values, error: false, [name]: e.target.value})
  };

  // cart values
  const cartTotal = () => {
    return subtotal
  }

  const Total = () => {
    return cartTotal() + shipping + tax;
  }

  // get braintree token
  const getToken = () => {
    getBraintreeClientToken(user._id)
    .then(data => {
      if(data.error)
      {
        setValues({...values, error: data.message});
      }

      else
      {
        setValues({...values, clientToken: data.clientToken})
      }
    })
  }

  useEffect(() => {
    check();
    getToken();
    //eslint-disable-next-line
  }, [])

  const buy = () => {
    // send nonce to server
    // nonce is data.instance.requestpaymentMethod()
    
    let nonce;
    
    let getNonce = instance.requestPaymentMethod()
    .then(data => {
      console.log(data);
      nonce = data.nonce;

      // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
      // and also total to be charged
      const paymentData = {
          paymentMethodNonce: nonce,
          amount: Total()
      }

      processPayment(user._id, paymentData)
      .then(response => {
        setValues({...values, success: response.success})
        
        // create order
        //TODO
        
        // empty cart
        emptyCart()
        .then(data => {
          if(data.success === false)
          {
            setValues({...values, success: false, error: data.message})
          }
          else
          {
            updateUser(data.data, () => {
              setValues({...values, subtotal: 0})
            })
          }
        })
      })
    })
    .catch(err => {
      console.log('dropin error: ', err);
    })
  }

  const showDropIn = () => (
    <div>
      {clientToken !== null ? (
        <div>
          <DropIn options = {{
            authorization: clientToken
          }} onInstance = {instance => (setValues({...values, instance: instance }))} />
          <button onClick={buy} className="btn btn-block btn-success">Pay</button>
        </div>
      ): null}
    </div>
  )

  const showError = error => (
    <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
    >
        {error}
    </div>
);

const showSuccess = success => (
    <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
    >
        Thanks! Your payment was successful! Please check your email
    </div>
);

  const showLoading = () => (
    loading && <Spinner/>
  )      
    
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
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal</strong><strong>${cartTotal()}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>${shipping}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">GST (@10%)</strong><strong>${tax}</strong></li>
              <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong><strong>${Total()}</strong></li>
            </ul>
            
            <h5>* Your order should be delivered within 7 days</h5>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for the seller</div>
          <div className="p-4">
            <p className="font-italic mb-4">If you have some information for the seller/delivery you can leave them in the box below</p>
            <textarea onChange={handleChange('instructions')} value={instructions} cols="30" rows="3" className="form-control"></textarea>
          </div>
          {showSuccess(success)}
          {showError(error)}
          {showDropIn()}
        </div>
      </div>

          <Footer />  
        </Fragment>
    )
}

export default withRouter(Checkout)