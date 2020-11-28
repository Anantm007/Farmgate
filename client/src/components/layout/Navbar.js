import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import { signout, isAuthenticated } from "../userAuth";
import { shopSignout, shopIsAuthenticated } from "../shopAuth";
import { cartLength } from "../user/apiUser";

import { makeStyles } from "@material-ui/core/styles";

const Navbar = ({ run }) => {
  let _id = null;
  if (shopIsAuthenticated()) _id = shopIsAuthenticated().shop._id;

  const [values, setValues] = useState({
    Length: 0,
  });

  const { Length } = values;

  const findLength = () => {
    cartLength().then((data) => {
      if (data && data && data.success === false) {
        setValues({ ...values, Length: 0 });
      }
      if (data && data && data.success === true)
        setValues({ ...values, Length: data.data });
    });
  };

  useEffect(() => {
    isAuthenticated() && findLength();
  }, [run]); // eslint-disable-line

  const styles = useStyles();

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg py-3 navbarbg shadow-sm"
      style={{ backgroundColor: "#649d66" }}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src={Logo}
            alt=""
            width="240"
            height="40"
            className="d-inline-block align-middle mr-2"
          />
        </Link>

        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler">
          <span className="navbar-toggler-icon">
            <i
              className="fas fa-bars"
              style={{ color: "#fff", fontSize: "28px" }}></i>
          </span>
        </button>

        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/" className={styles.navLink}>
                home <span className="sr-only"></span>
              </Link>
            </li>

            {/*                                           GUEST LINKS                                        */}
            {!isAuthenticated() && !shopIsAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link to="/shops" className={styles.navLink}>
                    shops
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/login" className={styles.navLink}>
                    login
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/user/register" className={styles.navLink}>
                    register
                  </a>
                </li>
              </Fragment>
            )}

            {/*                                           USER LINKS                                        */}
            {isAuthenticated() && !shopIsAuthenticated() && (
              <Fragment>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                  <li className="nav-item active">
                    <Link to="/user/dashboard" className={styles.navLink}>
                      dashboard <span className="sr-only"></span>
                    </Link>
                  </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                  <li className="nav-item active">
                    <a href="/cart" className={styles.navLink}>
                      cart{" "}
                      <sup>
                        <strong
                          className="cart-badge active"
                          style={{ backgroundColor: "green", padding: ".3em" }}>
                          {Length}
                        </strong>
                      </sup>
                    </a>
                  </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                  <li className="nav-item active">
                    <Link to="/admin/dashboard" className={styles.navLink}>
                      admin dashboard <span className="sr-only"></span>
                    </Link>
                  </li>
                )}

                <li className="nav-item active">
                  <Link to="/shops" className={styles.navLink}>
                    shops
                  </Link>
                </li>

                <li className="nav-item active">
                  <Link to="/" onClick={signout} className={styles.navLink}>
                    logout
                  </Link>
                </li>
              </Fragment>
            )}

            {/*                                           SHOP LINKS                                        */}
            {shopIsAuthenticated() && (
              <Fragment>
                <li className="nav-item active">
                  <Link to="/shop/dashboard" className={styles.navLink}>
                    dasboard <span className="sr-only"></span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to={`/shop/${_id}/items`} className={styles.navLink}>
                    manage items
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to={`/shop/${_id}/orders`} className={styles.navLink}>
                    manage orders
                  </Link>
                </li>

                <li className="nav-item active">
                  <Link to="/" onClick={shopSignout} className={styles.navLink}>
                    logout
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const useStyles = makeStyles({
  navLink: {
    color: "white",
    fontFamily: "Oswald, sans-serif",
    fontSize: "1.4em",
    margin: ".5em",
  },
});

export default Navbar;
