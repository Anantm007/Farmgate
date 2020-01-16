import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {shopIsAuthenticated} from '../shopAuth';
import Footer from '../layout/Footer';

const ShopDashboard = () => {

    const {shop: {_id, name, email}} = shopIsAuthenticated();

    const shopLinks = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header text-center">Shop Links</h4>
                <ul className="list-group">
                    <li className="list-group-item"><Link to={`/my/shops/${_id}`} className="nav-link">My Shop</Link></li>
                    <li className="list-group-item"><Link to="/create/item" className="nav-link">Create Item</Link></li>
                    <li className="list-group-item"><Link to="/shop/orders" className="nav-link">Manage Orders</Link></li>
                    <li className="list-group-item"><Link to="/shop/items" className="nav-link">Manage Items</Link></li>
                </ul>

            </div>
        )
    }

    const shopInfo = () => {
        return (
            <div className="card mb-5">
            <h3 className="card-header text-center">Shop Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{`Shop id : ${_id}`}</li>
            </ul>
            </div>
        )
    }

    return (
            <Fragment>
                <div style={{backgroundColor: '#c0ffb3', minHeight: '8rem', padding: '2rem', marginBottom: '2rem'}}>
                    <h1>Shop Dashboard</h1>
                    <h5>{`Welcome, ${name}`}</h5>
                </div>
                <div className="row">
                    <div className="xs-col-12 col-sm-4">
                        {shopLinks()}
                    </div>

                    <div className="xs-col-12 col-sm-8">
                        {shopInfo()}
                    </div>
                </div>
                <Footer/>
            </Fragment>
    )
}

export default ShopDashboard;