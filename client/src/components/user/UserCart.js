import React, { Fragment } from 'react'
import Footer from '../layout/Footer'
import CartItem from './CartItem';
import {isAuthenticated} from '../userAuth';

const UserCart = () => {

  const {user} = isAuthenticated();
    return (
        <Fragment>
          <br/>
          
          <h1 className="text-center">{user.name.split(" ").slice(0,-1)}'s Shopping Cart</h1>
          {user.cart.map((item, i) =>(
                    <div key={i}>    
                        <CartItem item={item} />      
                    </div>
          ))}
      <div class="row py-5 p-4 bg-white rounded shadow-sm">
        
        <div class="col-lg-6">
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for the seller</div>
          <div class="p-4">
            <p class="font-italic mb-4">If you have some information for the seller/delivery you can leave them in the box below</p>
            <textarea name="" cols="30" rows="2" class="form-control"></textarea>
          </div>
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Delivery Address</div>
          <div class="p-4">
            <p class="font-italic mb-4">Please check your delivery address before proceeding forward</p>
            <textarea name="" cols="30" rows="2" class="form-control" value={user.address} readOnly></textarea>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
          <div class="p-4">
            <p class="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
            <ul class="list-unstyled mb-4">
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>$390.00</strong></li>
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and handling</strong><strong>$4.5</strong></li>
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">GST (@10%)</strong><strong>$0.45</strong></li>
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                <input readOnly></input>
              </li>
            </ul><a href="#" class="btn btn-dark rounded-pill py-2 btn-block">Procceed to checkout</a>
          </div>
        </div>

      </div>

          <Footer />  
        </Fragment>
    )
}

export default UserCart
