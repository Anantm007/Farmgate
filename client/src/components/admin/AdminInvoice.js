import React, {Fragment, useState} from 'react'
import {generateInvoice} from './apiAdmin';
import Spinner from '../layout/Spinner';

const AdminInvoice = ({shop}) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const generate = () => {
        setLoading(true);
        setSuccess(false);
        setError(false);
        
        generateInvoice(shop._id)
        .then(data => {
            if(data.success === false)
            {
                setLoading(false);
                setSuccess(false);
                setError(data.message);        
            }

            else
            {
                setSuccess(true);
                setError(false);
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

    return (
        <Fragment>
            {showLoading()}
            <ul>
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

                     <button className="btn btn-success" onClick={generate}>GENERATE INVOICE</button>
                     <br/>
                    {showSuccess()}
                    {showError()}

                    <hr/>
                    <br/><br/>
                </li>
            </ul>

        </Fragment>
    )
}

export default AdminInvoice;
