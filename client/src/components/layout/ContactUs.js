import React, { Fragment, useState } from "react";
import { query } from "../admin/apiAdmin";

import { makeStyles } from "@material-ui/core/styles";

const ContactUs = () => {
  const styles = useStyles();

  const [values, setValues] = useState({
    name: "",
    email: "",
    description: "",
    error: "",
    success: false,
  });

  const { name, email, description, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: "", [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "" });
    query({ name, email, description }).then((data) => {
      if (data && data.success === false) {
        setValues({ ...values, error: data.message, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          description: "",
          success: true,
        });
      }
    });
  };

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
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}>
        Your query has been submitted successfully!
      </div>
    );
  };

  return (
    <Fragment>
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className={styles.heading}>CONTACT US</h1>
          <p className="lead text-muted mb-0">
            We would love to hear feedback from you
          </p>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <i className="fa fa-envelope"></i> CONTACT US
              </div>

              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange("name")}
                      value={name}
                      aria-describedby="emailHelp"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={handleChange("email")}
                      value={email}
                      aria-describedby="emailHelp"
                      placeholder="Your email"
                      required
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange("description")}
                      value={description}
                      rows="6"
                      required></textarea>
                  </div>
                  <div className="mx-auto">
                    <button
                      onClick={clickSubmit}
                      className="btn btn-block btn-primary text-center">
                      Submit
                    </button>
                    {showError()}
                    {showSuccess()}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-5">
            <div className="card bg-light mb-3">
              <div className="card-header bg-success text-white text-uppercase">
                <i className="fa fa-home"></i> Address
              </div>
              <div className="card-body">
                <p>Level 1, 49 George Street</p>
                <p>Norwood, South Australia</p>
                <p>Australia</p>
                <p>5067</p>
                <p>
                  <strong>ABN:</strong> 91688399669{" "}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:contact@farmgate-market.com">
                    {" "}
                    contact@farmgate-market.com
                  </a>
                </p>
                <p>
                  <strong>Tel:</strong>{" "}
                  <a href="https://wa.me/61438807530">+61 438 807 530</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles({
  heading: {
    fontFamily: "Oswald, sans-serif",
    fontSize: "3em",
  },
});

export default ContactUs;
