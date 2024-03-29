import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../userAuth";
import ContactUs from "../layout/ContactUs";
import Footer from "../layout/Footer";

const UserDashboard = () => {
  const {
    user: { _id, name, email, address },
  } = isAuthenticated();

  useEffect(() => {
    if (localStorage.getItem("redirectUrl")) {
      let url = localStorage.getItem("redirectUrl");
      url = url.substring(1, url.length - 1);
      window.location.href = `${window.location.origin}${url}`;
      localStorage.removeItem("redirectUrl");
    }
    // eslint-disable-next-line
  }, []);

  const userLinks = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header text-center">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/cart" className="nav-link">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/user/${_id}/orders`} className="nav-link">
              My Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/user/${_id}/settings`} className="nav-link">
              Account Settings & Delivery Address
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header text-center">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{address}</li>
          <li className="list-group-item">{`User id : ${_id}`}</li>
        </ul>
      </div>
    );
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: "#649d66",
          minHeight: "8rem",
          padding: "2rem",
          marginBottom: "2rem",
          marginTop: "1em",
        }}>
        <h1>User Dashboard</h1>
        <h5>{`Welcome, ${name}`}</h5>
      </div>
      <div className="row">
        <div className="xs-col-12 col-sm-4">{userLinks()}</div>

        <div className="xs-col-12 col-sm-8">{userInfo()}</div>
      </div>
      <ContactUs />
      <Footer />
    </Fragment>
  );
};

export default UserDashboard;
