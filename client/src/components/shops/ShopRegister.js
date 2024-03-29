import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { signup, authenticate, shopIsAuthenticated } from "../shopAuth";
import Footer from "../layout/Footer";
import { makeStyles } from "@material-ui/core/styles";

import { Login } from "../../images";

import TermsAndConditions from "../../utils/TermsAndConditions.pdf";
import PrivacyPolicy from "../../utils/Farmgate_Ag_Privacy_Policy.pdf";

const Register = () => {
  const styles = useStyles();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    address: "",
    zipCode: "",
    ABN: "",
    phoneNumber: "",
    error: "",
    image: "",
    description: "",
    facebook: "",
    instagram: "",
    success: false,
    formData: "",
  });

  const {
    name,
    email,
    password,
    repeatPassword,
    address,
    zipCode,
    ABN,
    phoneNumber,
    description,
    facebook,
    instagram,
    formData,
    success,
    error,
  } = values;

  const init = () => {
    setValues({ ...values, formData: new FormData() });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setValues({ ...values, error: "Passwords do not Match" });
      return;
    }

    signup(formData).then((data) => {
      if (data && data.success === false) {
        setValues({ ...values, error: data.message, success: false });
      } else if (data && data.success === true) {
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
          <h4 className="card-title mt-3 text-center">Create a Shop Account</h4>
          <p className="text-center">Get started with your free account</p>

          <form>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>
              </div>
              <input
                onChange={handleChange("name")}
                type="text"
                value={name}
                className="form-control"
                placeholder="Business name*"
              />
            </div>

            <div className="form-group">
              <label className="btn btn-secondary">
                Your Logo* &nbsp;
                <input
                  onChange={handleChange("image")}
                  type="file"
                  name="image"
                  accept="image/*"
                />
              </label>
            </div>

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
                placeholder="Your Email address*"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-phone"></i>{" "}
                </span>
              </div>
              <input
                onChange={handleChange("phoneNumber")}
                type="Number"
                value={phoneNumber}
                className="form-control"
                placeholder="Your Phone Number*"
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
                placeholder="Enter a Password*"
                type="password"
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
                onChange={handleChange("repeatPassword")}
                value={repeatPassword}
                className="form-control"
                placeholder="Confirm Password*"
                type="password"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-home"></i>{" "}
                </span>
              </div>
              <input
                onChange={handleChange("address")}
                type="text"
                value={address}
                className="form-control"
                placeholder="Full address*"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-suitcase"></i>{" "}
                </span>
              </div>
              <input
                onChange={handleChange("ABN")}
                type="text"
                value={ABN}
                className="form-control"
                placeholder="Australian Businness Number (ABN)*"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-home"></i>{" "}
                </span>
              </div>
              <input
                onChange={handleChange("zipCode")}
                type="Number"
                value={zipCode}
                className="form-control"
                placeholder="Your Postcode*"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fas fa-pen"></i>{" "}
                </span>
              </div>
              <textarea
                onChange={handleChange("description")}
                type="text"
                value={description}
                className="form-control"
                placeholder="A Detailed Shop Description*"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-facebook-official"></i>{" "}
                </span>
              </div>
              <input
                onChange={handleChange("facebook")}
                type="text"
                value={facebook}
                className="form-control"
                placeholder="Link to your Facebook Page"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-instagram"></i>{" "}
                </span>
              </div>
              <input
                onChange={handleChange("instagram")}
                type="text"
                value={instagram}
                className="form-control"
                placeholder="Link to your Instagram Page"
              />
            </div>
            {/* 
                        <br />
                        <div className="g-recaptcha" onChange={handleChange('g-recaptcha-response')} data-sitekey="6LeJ284UAAAAAHLyxMvzoMiOLWIpEvC3CjJxc25Y"></div>
                        <br />*/}
            <p className="text-center">
              <strong>*</strong> By signing up you agree to our{" "}
              <a href={PrivacyPolicy} target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href={TermsAndConditions}
                target="_blank"
                rel="noopener noreferrer">
                Terms & Conditions
              </a>{" "}
            </p>

            <div className="form-group">
              <button
                onClick={clickSubmit}
                className="btn btn-primary btn-block">
                {" "}
                Create Account{" "}
              </button>
            </div>
            {showError()}
            <p className="text-center">
              Have an account? <a href="/shop/login">Log In</a>{" "}
            </p>
          </form>
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

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}>
        New account is created. Please <Link to="/login">Signin</Link>
      </div>
    );
  };

  const redirectShop = () => {
    if (shopIsAuthenticated()) {
      return <Redirect to="/shop/dashboard" />;
    }
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `url(${Login})`,
          backgroundSize: "100% 105%",
          backgroundRepeat: "no-repeat",
        }}>
        {showSuccess()}
        {signUpForm()}
        {redirectShop()}
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

export default Register;
