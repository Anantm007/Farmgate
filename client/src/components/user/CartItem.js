import React, { Fragment, useState, useEffect } from 'react'
import Spinner from '../layout/Spinner';
import {updateUser, removeFromCart} from './apiUser';
import {getItem} from '../items/apiItems';
import {updateCartItem} from '../user/apiUser';

const CartItem = ({item, setRun = f => f, run=undefined}) => {
    const [values, setValues] = useState({
        foundItem: {},
        error: '',
        quantity: item.quantity,
        price: item.price,
        loading: false,
    });
    
    const {foundItem, loading, quantity, price, error} = values;

    const handleFocus = (event) => {
      event.target.select();
    }

    const decreaseQuantity = () => {
      
      if(quantity === 1)
      {
        removeItem(foundItem._id);
        return;
      }

      let q = quantity < 1 ? 1 : quantity - 1;
      
      updateCartItem(foundItem._id, q)
          .then(data => {
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

    const increaseQuantity = () => {
      let q = quantity < 1 ? 1 : quantity + 1;
      if(q === 0)
        q = 1;
      
      updateCartItem(foundItem._id, q)
          .then(data => {
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


    const handleChange = Item => event => {
      if(event.target.value < 1)
      {
        setValues({...values, quantity: 1})
        return;
      }

      else
      setValues({...values, quantity: event.target.value})

      const q = event.target.value < 1 ? 1: event.target.value;

      if (q >= 1) {
          setValues({...values, loading: true});
          updateCartItem(Item._id, q)
          .then(data => {
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
      item.item._id ? loadItem(item.item._id) : loadItem(item.item)
      //eslint-disable-next-line
    }, [])

    const removeItem = (foundItemId) => {
        setValues({...values, error: false, loading: true});
        removeFromCart(foundItemId)
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
        <div className="col-lg-12 p-5 bg-white rounded shadow-sm">

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
                      <h5 className="mb-0"><a href="/#" className="text-dark d-inline-block">{foundItem.name}</a></h5><span className="text-muted font-weight-normal font-italic">{foundItem.description}</span>
                      </div>
                    </div>
                  </th>
                  <td className="align-middle"><strong>{`$${foundItem.price} per ${foundItem.variant}`}</strong></td>
                  
                  <td className="align-middle">
                    <button type="button" className="fa fa-minus btn btn-number" onClick={decreaseQuantity} style={{height:"1.9rem", width: '3rem', border: 'solid 0.3px'}}></button>
                    
                    <input type="number" className="text-center" value={quantity} onFocus={handleFocus} onChange={handleChange(foundItem)} style={{width:"3rem"}} min="1"/>

                    <button type="button" class="fa fa-plus btn btn-number" onClick={increaseQuantity} style={{height:"1.9rem", width: '3rem',  border: 'solid 0.3px'}}></button>
                  </td>
                  
                  <td className="align-middle"><strong>${price}</strong></td>
                  <td className="align-middle"><i onClick={() => removeItem(foundItem._id)} className="fa fa-trash fa-2x"></i>
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
