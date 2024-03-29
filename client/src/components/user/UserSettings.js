import React, { useEffect, useState, Fragment } from "react";
import Footer from "../layout/Footer";
import { getUser, Update, updateUser } from "./apiUser";
import Spinner from "../layout/Spinner";

const UserSettings = (props) => {
  const id = props.match.params.id;

  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    zipCode: "",
    suburb: "",
    phoneNumber: "",
    error: false,
    loading: false,
    success: false,
  });

  const {
    name,
    email,
    address,
    zipCode,
    suburb,
    phoneNumber,
    error,
    loading,
    success,
  } = values;

  const loadUser = () => {
    setValues({ ...values, loading: true });
    getUser(id).then((data) => {
      if (data && data.success === false) {
        setValues({ ...values, error: data.message, loading: false });
      } else {
        setValues({
          ...values,
          name: data.data.name,
          email: data.data.email,
          address: data.data.address,
          phoneNumber: data.data.phoneNumber,
          zipCode: data.data.zipCode,
          suburb: data.data.suburb,
        });
      }
    });
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    Update(id, values).then((data) => {
      if (data && data.success === false) {
        setValues({
          ...values,
          error: data.message,
          success: false,
          loading: false,
        });
      } else {
        updateUser(data.data, () => {
          setValues({ ...values, success: true, error: false, loading: false });
        });
      }
    });
  };

  const UserForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      {showLoading()}

      <div className="form-group">
        <label>Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input className="form-control" value={email} readOnly />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          onChange={handleChange("phoneNumber")}
          type="number"
          className="form-control"
          value={phoneNumber}
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          onChange={handleChange("address")}
          type="text"
          className="form-control"
          value={address}
        />
      </div>

      <div className="form-group">
        <label>Zip Code</label>
        <input
          onChange={handleChange("zipCode")}
          type="number"
          className="form-control"
          value={zipCode}
        />
      </div>

      <div className="form-group">
        <label>Suburb</label>
        <input
          onChange={handleChange("suburb")}
          type="text"
          className="form-control"
          value={suburb}
        />
      </div>

      <br />
      <div className="text-center">
        <button className="btn btn-outline-primary">UPDATE</button>
        <br />
        <br />
        {showError()}
        {showSuccess()}
        {showLoading()}
      </div>
      <br />
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}>
        Details updated Succesfully
      </div>
    );
  };

  const showLoading = () => loading && <Spinner />;

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
        <h1>User Settings</h1>
        <h5>{`Welcome, ${name}`}</h5>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">{UserForm()}</div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default UserSettings;
