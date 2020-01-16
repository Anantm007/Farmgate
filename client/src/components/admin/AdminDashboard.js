import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../userAuth';
import Footer from '../layout/Footer';

const AdminDashboard = () => {

    const {user: {_id, name, email}} = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header text-center">Shop Links</h4>
                <ul className="list-group">
                    <li className="list-group-item"><Link to="/admin/shops" className="nav-link">Manage Shops</Link></li>
                    <li className="list-group-item"><Link to="/admin/orders" className="nav-link">Manage Orders</Link></li>
                    <li className="list-group-item"><Link to="/admin/users" className="nav-link">Manage Users</Link></li>
                </ul>

            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
            <h3 className="card-header text-center">Admin Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{`Admin id : ${_id}`}</li>
            </ul>
            </div>
        )
    }

    return (
            <Fragment>
                <div style={{backgroundColor: '#c0ffb3', minHeight: '8rem', padding: '2rem', marginBottom: '2rem'}}>
                    <h1>Admin Dashboard</h1>
                    <h5>{`Welcome, ${name}`}</h5>
                </div>
                <div className="row">
                    <div className="xs-col-12 col-sm-4">
                        {adminLinks()}
                    </div>

                    <div className="xs-col-12 col-sm-8">
                        {adminInfo()}
                    </div>
                </div>
                <Footer/>
            </Fragment>
    )
}

export default AdminDashboard;