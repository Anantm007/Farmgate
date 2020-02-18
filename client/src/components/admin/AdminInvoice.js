import React, {Fragment, useEffect, useState} from 'react'
import {isAuthenticated} from '../userAuth';
import {listShops, generateInvoice} from './apiAdmin';
import Footer from '../layout/Footer';
import Spinner from '../layout/Spinner';

const AdminInvoice = () => {
    const {user: { name}} = isAuthenticated();

    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const loadShops = () => {
        setLoading(true);
        setSuccess(false);
        setError(false);

        listShops().then(data => {
            if(data.success === false)
            {
                setLoading(false);
            }

            else
            {
                setShops(data.data);
                setLoading(false);
            }
        })
    }

    const generate = (shopId) => {
        setLoading(true);
        setSuccess(false);
        setError(false);
        
        generateInvoice(shopId)
        .then(data => {
            if(data.success === false)
            {
                setLoading(false);
                setError(data.message);        
            }

            else
            {
                setSuccess(true);
                setLoading(false);
            }
        })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error? '': 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => {
        return (<div className="alert alert-success" style={{display: success ? '': 'none'}}>
            Invoice generated, please check your email!
        </div>)
    }

    const showLoading = () => (
        loading && <Spinner/>
    )

    useEffect(() => {
        loadShops()
        //eslint-disable-next-line
    }, [])


    return (
        <Fragment>
            <div style={{backgroundColor: '#c0ffb3', minHeight: '8rem', padding: '2rem', marginBottom: '2rem'}}>
                <h1>Admin Dashboard</h1>
                <h5>{`Welcome, ${name}`}</h5>
            </div>

            <h2 className="text-center">GENERATE INVOICES FOR SHOPS</h2>
            {showLoading()}

            <ul style={{margin: '1rem'}}>
                {shops.map((shop, i) => (
                    <li>
                        <div className="row">
                            &nbsp;&nbsp;<h3>{shop.name}</h3>
                        </div>
                        <br/>
         
                        <div className="row">
                        <strong>&nbsp;&nbsp;Email: &nbsp;</strong><p>{shop.email}</p>
                        </div>

                        <div className="row">
                        <strong>&nbsp;&nbsp;Phone number: &nbsp;</strong><p>{shop.phoneNumber}</p>
                        </div>

                        <div className="row">
                        <strong>&nbsp;&nbsp;Address: &nbsp;</strong><p>{shop.address}</p>
                        </div>

                        <button className="btn btn-success" onClick={generate(shop._id)}>GENERATE INVOICE</button>
                        {showSuccess()}
                        {showError()}

                        <hr/>
                        <br/><br/>
                    </li>
                ))}
            </ul>

            <Footer />
        </Fragment>
    )
}

export default AdminInvoice
