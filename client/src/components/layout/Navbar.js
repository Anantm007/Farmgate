import React from 'react'
import { Link}  from "react-router-dom";
import Logo from "../../images/logo.png";

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg py-3 navbar-dark navbarbg shadow-sm">
            <div className="container">
                <Link to ="/" className="navbar-brand">
                <img src={Logo} width="200" height="30" alt="" className="d-inline-block align-middle mr-2" />
                </Link>

                <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>

                <div id="navbarSupportedContent" className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active"><a href="#" className="nav-link">Home <span className="sr-only">(current)</span></a></li>
                    <li className="nav-item"><a href="/shop" className="nav-link">Shop</a></li>
                    <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                    <li className="nav-item"><a href="/user/register" className="nav-link">Signup</a></li>
                </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;
