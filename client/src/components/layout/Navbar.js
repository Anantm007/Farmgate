import React, {Fragment, useState, useEffect} from 'react'
import { Link }  from "react-router-dom";
import Logo from "../../images/logo.png";
import {signout, isAuthenticated} from '../userAuth';
import {shopSignout, shopIsAuthenticated} from '../shopAuth';
import {cartLength} from '../user/apiUser';

const Navbar = () => {

    let _id = null;
    if(shopIsAuthenticated())
    _id = shopIsAuthenticated().shop._id;

    const [values, setValues] = useState({
        Length: 0
    });

    const {Length} = values;

    const findLength = () => {
        cartLength()
        .then(data => {
            if(data.success === false)
            {
                setValues({...values, Length: 0})
            }
            if(data.success === true)
            setValues({...values, Length: data.data})
        })
    }
    
    useEffect(() => {
        isAuthenticated() && findLength()
        //eslint-disable-next-line
    }, [])    
    

    return (
        <nav className="navbar navbar-expand-lg py-3 navbar-dark navbarbg shadow-sm">
            <div className="container">
                <Link to ="/" className="navbar-brand">
                <img src={Logo} width="200" height="30" alt="" className="d-inline-block align-middle mr-2" />
                </Link>

                <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>

                <div id="navbarSupportedContent" className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                
                <li className="nav-item active"><Link to="/" className="nav-link">HOME <span className="sr-only"></span></Link></li>
                
                {/*                                           GUEST LINKS                                        */}
                {!isAuthenticated() && !shopIsAuthenticated() && (
                    <Fragment>         
                        <li className="nav-item"><Link to="/shops" className="nav-link">SHOPS</Link></li>
                        <li className="nav-item"><Link to="/user/login" className="nav-link">LOGIN</Link></li>
                        <li className="nav-item"><a href="/user/register" className="nav-link">REGISTER</a></li>
                    </Fragment>
                )}


                {/*                                           USER LINKS                                        */}
                        {isAuthenticated() && !shopIsAuthenticated() && (
                            <Fragment>
                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            
                            <li className="nav-item active"><Link to="/user/dashboard" className="nav-link">DASHBOARD <span className="sr-only"></span></Link></li>
                        )}
                      
                        {isAuthenticated() && isAuthenticated().user.role === 0 && (                            
                            <li className="nav-item active">
                                <a href="/cart" className="nav-link">
                                 CART <sup><small className="cart-badge active">{Length}</small></sup>
                                </a>
                            </li>
                        )}

                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            
                            <li className="nav-item active"><Link to="/admin/dashboard" className="nav-link">ADMIN DASHBOARD <span className="sr-only"></span></Link></li>
                        )}

                        <li className="nav-item active"><Link to="/shops" className="nav-link">SHOPS</Link></li>
                        

                        <li className="nav-item active">
                            <Link to="/" onClick={signout} className="nav-link">
                                LOGOUT
                            </Link>
                        </li>

                    </Fragment>
                )}


                {/*                                           SHOP LINKS                                        */}
                {shopIsAuthenticated() && (
                    <Fragment>    
                        <li className="nav-item active"><Link to="/shop/dashboard" className="nav-link">DASHBOARD <span className="sr-only"></span></Link></li>
                        <li className="nav-item active"><Link to={`/shop/${_id}/items`} className="nav-link">MANAGE ITEMS</Link></li>
                        <li className="nav-item active"><Link to={`/shop/${_id}/orders`} className="nav-link">MANAGE ORDERS</Link></li>

                        <li className="nav-item active">
                            <Link to="/" onClick={shopSignout} className="nav-link">
                                LOGOUT
                            </Link>
                        </li>

                    </Fragment>
                )}

                </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;
