import React, {Fragment, useEffect, useState} from 'react'
import {isAuthenticated} from '../userAuth';
import {getUsers} from './apiAdmin';
import Footer from '../layout/Footer';
import Spinner from '../layout/Spinner';

const AdminUsers = () => {
    const {user: { name}} = isAuthenticated();

    const [users, setUsers] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true);

    const loadShops = () => {
        getUsers().then(data => {
            if(data.success === false)
            {
                setError(data.message);
                setLoading(false);
            }

            else
            {
                setUsers(data.data);
                setLoading(false);
            }
        })
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

            <h2 className="text-center">ALL USERS' INFORMATION</h2>
            {showLoading()}

            <ul style={{margin: '1rem'}}>
                {users.map((user, i) => (
                    user.role === 0 &&
                    <li>
                        <div className="row">
                            &nbsp;&nbsp;<h3>{user.name}</h3>
                        </div>
                        <br/>
         
                        <div className="row">
                        <strong>&nbsp;&nbsp;Email: &nbsp;</strong><p>{user.email}</p>
                        </div>

                        <div className="row">
                        <strong>&nbsp;&nbsp;Phone number: &nbsp;</strong><p>{user.phoneNumber}</p>
                        </div>

                        <div className="row">
                        <strong>&nbsp;&nbsp;Address: &nbsp;</strong><p>{user.address}</p>
                        </div>

                        <div className="row">
                        <strong>&nbsp;&nbsp;Zip Code: &nbsp;</strong><p>{user.zipCode}</p>
                        </div>

                        <br/><br/>
                    </li>
                ))}
            </ul>

            <Footer />
        </Fragment>
    )
}

export default AdminUsers
