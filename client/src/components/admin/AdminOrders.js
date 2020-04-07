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
        updateOrderStatus(orderId, e.target.value)
        .then(data => {
            if(data.success === false)
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
                <h4 className="text-danger">Total Orders: {orders.length}</h4>
            )
        }

        else if(!loading)
        {
            return (
                <Fragment>
                    <h1 className="text-danger">No Orders</h1>
                    <br/>
                    <br/>
                    <br/>
                    <h2 className="text-danger">All the orders will be listed here</h2>
                    <br/><br/><br/>
                </Fragment>
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
                                <li className="list-group-item" style={{fontWeight: 'bold'}}>Order_id: {o._id}</li>
                                <li className="list-group-item">{showStatus(o)}</li>
                                <li className="list-group-item" ><strong>Total Amount:</strong> ${o.totalAmount.toFixed(3)}</li>
                                <li className="list-group-item" ><strong>Ordered by:</strong> {o.userName} ({o.user})</li>
                                <li className="list-group-item" ><strong>Ordered from:</strong> {o.shopName} ({o.shop})</li>
                                <li className="list-group-item" ><strong>Delivery Address:</strong> {o.deliveryAddress}</li>
                                <li className="list-group-item" ><strong>Order Date:</strong> {Moment(o.createdAt).format('YYYY/MM/DD')}</li>
                                <li className="list-group-item" ><strong>Delivery Instructions:</strong> {o.instructions}</li>
                                <li className="list-group-item" ><strong>Total Items:</strong> {o.items.length}</li>
                            </ul>

                            {o.items.map((p, pIndex) => (
                                <div className="mb-4" key={pIndex} style={{padding: '20px'}}>
                                    {showInput('Item Id', p.item)}
                                    {showInput('Item Name', p.itemName)}
                                    {showInput('Item Quantity', p.quantity + ' X ' + p.variant)}
                                </div>
                            ))}
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
