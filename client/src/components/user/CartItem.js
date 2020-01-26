import React, { Fragment, useState, useEffect } from 'react'
import Spinner from '../layout/Spinner';
import {updateUser, removeFromCart} from './apiUser';
const CartItem = ({item}) => {

    const [values, setValues] = useState({
        foundItem: {},
        error: '',
        success: true,
        loading: false,
    });

    const {foundItem, loading, error} = values;

    
    const removeItem = () => {
        setValues({...values, error: false, loading: true});
        
        removeFromCart(item.item)
        .then(data => {
            if(data.success === false)
            {
                setValues({...values, error: data.message, success: false, loading: false});
            }
            else
            {
                updateUser(data.data, () => {
                    setValues({...values, success: true, loading: false});
                });
                window.location.reload(false);
            }
        })

    }

    const showError = () => {
        return (<div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
        )
    }

    const showLoading = () => 
            loading && <Spinner/>


    return (
        <Fragment>
            <div class="pb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="border-0 bg-light">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Item Total</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Remove</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div class="p-2">
                        {showLoading()}
                        {showError()}
                      <img src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-3_cexmhn.jpg" alt="" width="70" class="img-fluid rounded shadow-sm" />
                      <div class="ml-3 d-inline-block align-middle">
                        <h5 class="mb-0"><a href="#" class="text-dark d-inline-block">{item.item} Item</a></h5><span class="text-muted font-weight-normal font-italic">Product Description</span>
                      </div>
                    </div>
                  </th>
                  <td class="align-middle"><strong>$79.00/kg</strong></td>
                  <td class="align-middle"><input type="number" style={{width:"3rem"}} min="1" value={item.quantity}></input></td>
                  <td class="border-0 align-middle"><strong>${item.price}</strong></td>
                  <td class="align-middle"><i onClick={removeItem} class="fa fa-trash"></i>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>

      </div>
  </div>
</div>
        </Fragment>
    )
}

export default CartItem
