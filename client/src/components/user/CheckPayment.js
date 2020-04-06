import React, {useState, useEffect, Fragment} from 'react'
import { updateUser, createOrder, checkPaymentStatus, readInfo, removeInfo} from '../user/apiUser';
import {isAuthenticated} from '../userAuth';
import Spinner from '../layout/Spinner';

const CheckPayment = () => {
    const data = readInfo();
    const {user} = isAuthenticated();

    // console.log('heeyyy', data, user.name)

    const [values, setValues] = useState({
        instructions : data.instructions, 
        subtotal : data.subtotal,
        tax : data.tax,
        shipping : data.shipping,
        accessCode : data.accessCode,
        loading: false,
        success: false,
        error: ''
    })

    const {instructions, subtotal, tax, shipping, accessCode, loading, error, success} = values;
    
    const buy = () => {
        console.log('1111 herre')
        setValues({...values, loading: true})
        checkPaymentStatus(user._id, accessCode)
        .then(data => {
            console.log('lol', data, data.success, )
        if(data.success === false)
        {
            console.log('999')
            setValues({...values, error: true, loading: false})
            removeInfo();
        }
        else
        {
            console.log('888')
            setValues({...values, success: true, loading: false})
            placeOrder()
        }
        })

    }

    const showLoading = () => (
        loading && <Spinner/>
    )

        
    const placeOrder = () => {
        removeInfo()
        console.log('7777')
        // create order      
        let data = {
            instructions,
            subtotal,
            tax_shipping: tax + shipping,
            totalAmount: subtotal + tax + shipping,
            accessCode,
        }
        console.log('reached', data)
        createOrder(user._id, data)
        .then(data => {
            console.log('nnnn',data)
            if(data.success === false)
            {
                console.log('223333')
            setValues({...values, success: false, error: data.message});
            }

            else
            {
                updateUser(data.data, () => {
                setValues({...values, success: true, loading: false})
                // window.setTimeout(function(){
                // window.location.href = `/user/${user._id}/orders`;
                // }, 2300);
        
            })
            }
        })    
        .catch(err => {
            console.log('oooooooo')
            console.log('dropin error: ', err);
        })

    }

    useEffect(() => {
        console.log('muyyyy')
        buy()
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            {loading ? <Fragment> <h3>Processing your Payment...</h3>
            <br />
            <h5 style={{color: 'red'}}>Do not refresh or close this page</h5> </Fragment>
            : '' }
            {error ? <Fragment>  <h5 style={{color: 'red'}}>Payment Declined, please try again with correct payment information...</h5> 
            </Fragment> : ''}
            {success ? <Fragment>  <h5 style={{color: 'green'}}>Payment Successful, please wait while we confirm your order...</h5> 
            </Fragment> : ''}
            
            {showLoading()}
        </div>
    )
}

export default CheckPayment
