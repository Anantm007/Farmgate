import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, shopIsAuthenticated } from "../shopAuth";
import { makeStyles } from "@material-ui/core/styles";
import ForgotPass from "./ForgotPass";
import Footer from "../layout/Footer";

import { Login } from "../../images";
import Spinner from "../layout/Spinner";

const ShopLogin = () => {
  const styles = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const { email, password, loading, error } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data && data.success === false) {
        setValues({ ...values, error: data.message, loading: false });
      } else {
        window.location.reload(false); // To reload the page for navbar updation
        authenticate(data, () => {
          setValues({ ...values, loading: false });
        });
      }
    });
  };

  const signUpForm = () => (
    <div className="container">
      <br />
      <br />

      <div className="card bg-light" style={{ marginBottom: "0" }}>
        <article className="card-body mx-auto" style={{ maxWdith: "400px" }}>
          <h4 className="card-title mt-3 text-center">Shop Login</h4>
          <p className="text-center">Login now to manage items/orders</p>

          <form>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-envelope"></i>{" "}
                </span>
              </div>
              <input
                onChange={handleChange("email")}
                type="email"
                value={email}
                className="form-control"
                placeholder="Your Email address"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                placeholder="Enter Your Password"
                type="password"
              />
            </div>

            <br />
            <div className="form-group">
              <button
                onClick={clickSubmit}
                className="btn btn-primary btn-block">
                {" "}
                Sign In
              </button>
            </div>
            <br />

            {/* Forgot Password */}
            <div className="container">
              <a href="/#" data-target="#pwdModal" data-toggle="modal">
                Forgot my password
              </a>
            </div>

            <ForgotPass id="pwdModal" />

            {/* Forgot Password end */}

            <br />
            <br />
            <p className="text-center">
              Don't Have an account? <a href="/shop/register">Register</a>{" "}
            </p>
          </form>
          <br />
          <br />
        </article>
      </div>
    </div>
  );

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}>
        {error}
      </div>
    );
  };

  const showLoading = () => loading && <Spinner />;

  const redirectShop = () => {
    if (shopIsAuthenticated()) {
      return <Redirect to="/shop/dashboard" />;
    }
  };

  return loading ? (
    <div>{showLoading()}</div>
  ) : (
    <Fragment>
      <div
        style={{
          backgroundImage: `url(${Login})`,
          backgroundSize: "100% 105%",
          backgroundRepeat: "no-repeat",
        }}>
        {showError()}
        {showLoading()}
        {redirectShop()}
        {signUpForm()}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles({
  footer: {
    "@media (min-height: 700px)": {
      paddingTop: "5rem",
      height: "18rem",
      background: "#649d66",
    },
  },
});

export default ShopLogin;
