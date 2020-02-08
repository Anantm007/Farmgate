import React, {Fragment, useEffect, useState} from 'react'
import {isAuthenticated} from '../userAuth';
import Footer from '../layout/Footer';
import {listOrders, getStatusValues, updateOrderStatus} from './apiAdmin';
import Moment from 'moment';
import Spinner from '../layout/Spinner';

const AdminOrders = () => {
    const {user: { name}} = isAuthenticated();

    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const {user, token} = isAuthenticated();
    
    const loadOrders = () => {
        setLoading(true);
        listOrders().then(data => {
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
    
    const loadStatusValues = () => {
        setLoading(true);
        getStatusValues(user._id, token).then(data => {
            if(data.success === false)
            {
                console.log(data.message);
                setLoading(false);
            }

            else
            {
                setStatusValues(data.data);
                setLoading(false);
            }
        })
    }

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
        .then(data => {
            if(data.error)
            {
                console.log("Status update fail");
            }

            else
            {
                loadOrders()
            }
        })
    }

    const showStatus = (o) => {
        return (<div className="form-group">
            <h6 className="mark mb-4">Status: {o.status}</h6>
            <select className = "form-control" onChange={(e) => handleStatusChange(e,o._id)}>
                <option>Update Status</option>
                {statusValues.map((status, i) => (
                     <option key={i} value={status}>{status}</option>
                ))}
            </select>
        </div>)
    }

    
    const showOrdersLength = () => {
        if(orders.length > 0)
        {
            return (
                <h2 className="text-danger display-2">Total Orders: {orders.length}</h2>
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
        loadStatusValues()
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
                <h1>Admin Dashboard</h1>
                <h5>{`Welcome, ${name}`}</h5>
            </div>

            <h2 className="text-center">MANAGE ALL ORDERS</h2>
            {showLoading()}
            <div className="row">
            <div className="xs-col-12 col-sm-8">
                {showOrdersLength()}
                
                {orders.map((o, oIndex) => {
                    return (
                        <div key={oIndex} className="mt-5" style={{borderBottom: "5px solid indigo"}}>
                            
                            <ul className="list-group mb-2">
                                <li className="list-group-item">{showStatus(o)}</li>
                                <li className="list-group-item" style={{fontWeight: 'bold'}}>Order_id: {o._id}</li>
                                <li className="list-group-item" style={{fontWeight: 'bold'}}>Amount: ${o.totalAmount}</li>
                                <li className="list-group-item" style={{fontWeight: 'bold'}}>Ordered by: {o.user}</li>
                                <li className="list-group-item" style={{fontWeight: 'bold'}}>Ordered from: {o.shop}</li>
                                <li className="list-group-item" style={{fontWeight: 'bold'}}>Order Date: {Moment(o.createdAt).fromNow()}</li>
                                <li className="list-group-item" style={{fontWeight: 'bold'}}>Delivery Instructions: {o.instructions}</li>
                                <li className="list-group-item" style={{fontWeight: 'bold'}}>Total Items: {o.items.length}</li>
                            </ul>

                            {o.items.map((p, pIndex) => {
                                return (<div className="mb-4" key={pIndex} style={{padding: '20px', border: '1px solid indigo'}}>
                                    {showInput('Item id', p._id)}
                                    {showInput('Item Quantity', p.quantity)}
                                </div>)

                            })}
                        </div>
                    )
                })}
            </div>
            </div>
            
        <Footer />
    </Fragment>
    )
}

export default AdminOrders
