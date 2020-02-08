import React, {Fragment, useEffect, useState} from 'react'
import {isAuthenticated} from '../userAuth';
import Footer from '../layout/Footer';
import {listOrders} from './apiUser';
import Moment from 'moment';
import Spinner from '../layout/Spinner';

const UserOrders = () => {
    const {user: { _id, name}} = isAuthenticated();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const loadOrders = () => {
        setLoading(true);
        listOrders(_id).then(data => {
            if(data.success === false)
            {
                console.log(data.message);
                setLoading(false);
            }

            else
            {
                setOrders(data.data);
                setLoading(false);
            }
        })
    }
    

    const showStatus = (o) => {
        return (<div className="form-group">
            <h6 className="mark mb-4">Status: {o.status}</h6>
        </div>)
    }

    
    const showOrdersLength = () => {
        if(orders.length > 0)
        {
            return (
                <h4 className="text-danger">Total Orders: {orders.length}</h4>
            )
        }

        else
        {
            return (
                <h1 className="text-danger">No Orders</h1>
            )
        }
    }

    const showLoading = () => (
        loading && <Spinner/>
    )


    useEffect(() => {
        loadOrders()
        showLoading()
        // eslint-disable-next-line
    }, [])


    const showInput = (key, value) => {
        return (<div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" className="form-control" value={value} readOnly />
        </div>)
    }



    return (
        <Fragment>
            <div style={{backgroundColor: '#c0ffb3', minHeight: '8rem', padding: '2rem', marginBottom: '2rem'}}>
                <h1>User Dashboard</h1>
                <h5>{`Welcome, ${name}`}</h5>
            </div>

            <h2 className="text-center">MY ORDERS</h2>
            {showLoading()}
            <div className="row">
            <div className="xs-col-12 col-sm-8">
                {showOrdersLength()}
                
                {orders.map((o, oIndex) => {
                    return (
                        <div key={oIndex} className="mt-5" style={{borderBottom: "5px solid indigo"}}>
                            
                            <ul className="list-group mb-2">
                                <li className="list-group-item" style={{fontWeight: 'bold'}}>Order_id: {o._id}</li>
                                <li className="list-group-item">{showStatus(o)}</li>
                                <li className="list-group-item" >Total Amount: ${o.totalAmount}</li>
                                <li className="list-group-item" >Ordered from: {o.shopName}</li>
                                <li className="list-group-item" >Order Date: {Moment(o.createdAt).format('YYYY/MM/DD')}</li>
                                <li className="list-group-item" >Total Items: {o.items.length}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
            </div>
            
        <Footer />
    </Fragment>
    )
}

export default UserOrders
