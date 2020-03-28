import React, { Fragment, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Footer from '../layout/Footer'
import {isAuthenticated} from '../userAuth';
import {getClientToken, updateUser, createOrder, checkPaymentStatus, sendErrorEmail} from '../user/apiUser';
import { withRouter } from 'react-router-dom';

const Checkout = (props) => {

  const {user} = isAuthenticated();

  const check = () => {
    if(!props.location.state)
    {
      window.location = `/cart`;
    }

    if(user.cart.length < 0)
    {
      window.location = '/cart'
    }

    if(props.location.state.subtotal < 25)
    {
      window.location = '/cart'
    }
  }

  const [values, setValues] = useState({
    shipping: props.location.state ? props.location.state.shipping: 4.5,
    tax: props.location.state ? props.location.state.tax: 0.45,
    subtotal: props.location.state ? props.location.state.subtotal: 0,
    loading: false,
    instructions: '',
    accessCode: '',
    formUrl: '',
    paymentSuccess: false,
    success: false,
    error: '',
    total: 0
  });

  const {shipping, tax, instructions, subtotal, accessCode, formUrl, paymentSuccess, success, error, loading} = values;

  const handleChange = name => e => {
    setValues({...values, error: false, [name]: e.target.value})
  };

  // cart values
  const cartTotal = () => {
    return subtotal
  }

  const Total = () => {
    return cartTotal() === 0 ? 0 : cartTotal() + shipping + tax;
  }

  // get access code for payment
  const getToken = () => {
    const t = Total();
    getClientToken(user._id, {t})
    .then(data => {
      console.log(data)
      if(data.success === true)
      {
        setValues({...values, accessCode: data.accessCode, formUrl: data.formUrl})
      }

      else
      {
        setValues({...values, error: data.message});
      }
    })
  }

  useEffect(() => {
    check();
    getToken();
    //eslint-disable-next-line
  }, [])
  
  const buy = () => {

    checkPaymentStatus(user._id, {code: accessCode})
    .then(data => {
      if(data.success === true)
      {
        setValues({...values, paymentSuccess: true})
      }
      else
      {
        setValues({...values, paymentSuccess: false})
      }
    })

    // create order      
    if(paymentSuccess)
    {
      let data = {
        instructions,
        subtotal,
        tax_shipping: tax + shipping,
        totalAmount: subtotal + tax + shipping
      }
      
      createOrder(user._id, data)
      .then(data => {
        console.log(data)
        if(data.success === false)
        {
          setValues({...values, success: false, error: data.message});
        }

        else
        {
            updateUser(data.data, () => {
            setValues({...values, success: true, loading: false, subtotal: 0, instructions: ''})
            window.setTimeout(function(){
              window.location.href = `/user/${user._id}/orders`;
            }, 2300);
      
          })
        }
      })    
      .catch(err => {
        console.log('dropin error: ', err);
      })
    }

    // else
    // {
    //   sendErrorEmail();
    // }

  }


  const showDropIn = () => (
    <div class="padding">
    <div class="row">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-header">
                    <strong>Pay With Card</strong>
                </div>
                <div class="card-body">
                  <form method="POST" action={formUrl} id="payment_form">
                  <input type="hidden" name="EWAY_ACCESSCODE" value={accessCode} />
                  <input type="hidden" name="EWAY_PAYMENTTYPE" value="Credit Card" />
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input class="form-control" onChange={handleChange('name')} name="EWAY_CARDNAME" type="text" placeholder="Name on the card" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="ccnumber">Credit Card Number</label>
                                <div class="input-group">
                                    <input class="form-control" type="number" onChange={handleChange('ccNumber')} name="EWAY_CARDNUMBER" placeholder="Your credit card number"/>
                                    <div class="input-group-append">
                                        <span class="input-group-text">
                                            <i class="mdi mdi-credit-card"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label for="ccmonth">Card Expiry Month</label>
                            <input class="form-control" type="number" onChange={handleChange('expMonth')} name="EWAY_CARDEXPIRYMONTH" placeholder="MM" />
                          </div>
                        <div class="form-group col-sm-4">
                            <label for="ccyear">Card Expiry Year</label>
                            <input class="form-control" type="number" onChange={handleChange('expYear')} name="EWAY_CARDEXPIRYYEAR" placeholder="YYYY" />
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="cvv">CVV/CVC</label>
                                <input class="form-control" type="number" onChange={handleChange('cvv')} name="EWAY_CARDCVN" placeholder="XXX" />
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                    <button onClick={buy} class="btn btn-block btn-success" type="submit">
                        <i class="mdi mdi-gamepad-circle"></i> PAY</button>
                    </div>
                  </form>
                </div>
                
                
                
            </div>
        </div>
    </div>
</div>
  )

  const showError = () => {
    return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
        {error}
    </div>
    )
  }

const showSuccess = success => (
    <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
    >
        Thanks! Your order was successful! Please check your email
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
            
            <h6>* Your order should be delivered within 7 days (delivery days were stipulated when you added items to your cart)</h6>
            <h6>** Your bank statement will show debits to <strong>Farmgate Ag</strong> (our trading name)</h6>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for the seller</div>
          <div className="p-4">
            <p className="font-italic mb-4">If you have any special delivery instructions for the delivery driver you can leave them in the box below</p>
            <textarea onChange={handleChange('instructions')} value={instructions} cols="30" rows="3" className="form-control"></textarea>
          </div>
          {showSuccess(success)}
          {showError(error)}
        </div>
      </div>
      {showDropIn()}

          <Footer />  
        </Fragment>
    )
}

export default withRouter(Checkout)
