import React, {Fragment} from 'react'
import { Link}  from "react-router-dom";
import Logo from "../../images/logo.png";
import {signout, isAuthenticated} from '../userAuth';
import {shopSignout, shopIsAuthenticated} from '../shopAuth';

const Navbar = ({history}) => {
    return (
        <nav className="navbar navbar-expand-lg py-3 navbar-dark navbarbg shadow-sm">
            <div className="container">
                <Link to ="/" className="navbar-brand">
                <img src={Logo} width="200" height="30" alt="" className="d-inline-block align-middle mr-2" />
                </Link>

                <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>

                <div id="navbarSupportedContent" className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                
                <li className="nav-item active"><a href="/" className="nav-link">HOME <span className="sr-only"></span></a></li>
                
                {/*                                           GUEST LINKS                                        */}
                {!isAuthenticated() && !shopIsAuthenticated() && (
                    <Fragment>         
                        <li className="nav-item"><a href="/shops" className="nav-link">SHOPS</a></li>
                        <li className="nav-item"><a href="/user/login" className="nav-link">LOGIN</a></li>
                        <li className="nav-item"><a href="/user/register" className="nav-link">REGISTER</a></li>
                    </Fragment>
                )}


                {/*                                           USER LINKS                                        */}
                {isAuthenticated() && (
                    <Fragment>
                        {isAuthenticated() && isAuthenticated().user.Role === 0 && (
                            
                            <li className="nav-item active"><a href="/user/dashboard" className="nav-link">DASHBOARD <span className="sr-only"></span></a></li>
                        )}

                        {isAuthenticated() && isAuthenticated().user.Role === 1 && (
                            
                            <li className="nav-item active"><a href="/admin/dashboard" className="nav-link">DASHBOARD <span className="sr-only"></span></a></li>
                        )}

                        <li className="nav-item active"><a href="/shops" className="nav-link">SHOPS</a></li>
                        
                        <li className="nav-item active">
                            <a href="/cart" className="nav-link">
                            CART <sup><small className="cart-badge active">5</small></sup>
                            </a>
                        </li>

                        <li className="nav-item active">
                            <a href="/" onClick={() => signout(() => {
                        history.push('/') })} className="nav-link">
                                LOGOUT
                            </a>
                        </li>

                    </Fragment>
                )}


                {/*                                           SHOP LINKS                                        */}
                {shopIsAuthenticated() && (
                    <Fragment>    
                        <li className="nav-item active"><a href="/shop/dashboard" className="nav-link">DASHBOARD <span className="sr-only"></span></a></li>
                        <li className="nav-item active"><a href="/shops/my/items" className="nav-link">MANAGE ITEMS</a></li>
                        <li className="nav-item active"><a href="/shops/my/orders" className="nav-link">MANAGE ORDERS</a></li>

                        <li className="nav-item active">
                            <a href="/" onClick={() => shopSignout(() => {
                        history.push('/') })} className="nav-link">
                                LOGOUT
                            </a>
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
