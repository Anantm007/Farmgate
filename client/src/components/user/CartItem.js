import React, { Fragment, useState, useEffect } from 'react'
import Spinner from '../layout/Spinner';
import {updateUser, removeFromCart} from './apiUser';
import {getItem} from '../items/apiItems';
import {updateCartItem} from '../user/apiUser';

const CartItem = ({item}) => {
    const [values, setValues] = useState({
        foundItem: {},
        error: '',
        quantity: item.quantity,
        price: item.price,
        loading: false,
    });
    
    const {foundItem, loading, quantity, price, error} = values;


    const handleChange = productId => event => {
      if(event.target.value < 1)
      setValues({...values, quantity: 1})
      
      else
      setValues({...values, quantity: event.target.value})

      const q = event.target.value <1 ? 1: event.target.value;

      if (q >= 1) {
          setValues({...values, loading: true});

          updateCartItem(productId, q)
          .then(data => {
            console.log(data)
            if(data.success === false)
            {
              setValues({...values, loading: false, error: data.message})
            }

            else
            {
              updateUser(data.data, () => {
                setValues({...values, loading: false, quantity: data.quantity, price: data.price})
              });
            window.location.reload(false);

            }
          })
      }
    }; 

    const loadItem = (id) => {
      setValues({...values, loading: true})
      getItem(id)
      .then(data => {
        if(data.success === false)
        {
          setValues({...values, error: data.message, loading: false})
        }

        else
        {
          setValues({...values, foundItem: data.data, loading: false})
        }
      })
    }

    useEffect(() => {
      loadItem(item.item)
      //eslint-disable-next-line
    }, [])

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
            <div className="pb-5">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="border-0 bg-light">
                    <div className="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Item Total</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Remove</div>
                  </th>
                </tr>
              </thead>
              <tbody>
              {showError()}
                {loading ? showLoading() : <Fragment>
                  <tr>
                  <th scope="row">
                    <div className="p-2">                        
                      <img src={`/api/items/photo/${foundItem._id}`} alt="" width="70" className="img-fluid rounded shadow-sm" />
                      <div className="ml-3 d-inline-block align-middle">
                      <h5 className="mb-0"><a href="#" className="text-dark d-inline-block">{foundItem.name}</a></h5><span className="text-muted font-weight-normal font-italic">{foundItem.description}</span>
                      </div>
                    </div>
                  </th>
                  <td className="align-middle"><strong>{`$${foundItem.price}/${foundItem.variant}`}</strong></td>
                  <td className="align-middle"><input type="number" value={quantity} onChange={handleChange(`${item.item}`)} style={{width:"3rem"}} min="1"/></td>
                  <td className="align-middle"><strong>${price}</strong></td>
                  <td className="align-middle"><i onClick={removeItem} className="fa fa-trash"></i>
                  </td>
                </tr>
                  </Fragment>}
                
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
