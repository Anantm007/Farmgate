import React, { useEffect, useState, Fragment } from "react";
import Footer from "../layout/Footer";
import { getShop, Update, updateShop } from "./apiShops";
import Spinner from "../layout/Spinner";

const ShopSettings = (props) => {
  const id = props.match.params.id;

  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    zipCode: "",
    phoneNumber: "",
    facebook: "",
    instagram: "",
    error: false,
    loading: false,
    success: false,
  });

  const {
    name,
    email,
    address,
    zipCode,
    phoneNumber,
    facebook,
    instagram,
    error,
    loading,
    success,
  } = values;

  const loadShop = () => {
    setValues({ ...values, loading: true });
    getShop(id).then((data) => {
      if (data && data.success === false) {
        setValues({ ...values, error: data.message, loading: false });
      } else {
        setValues({
          ...values,
          name: data.data.name,
          email: data.data.email,
          address: data.data.address,
          phoneNumber: data.data.phoneNumber,
          facebook: data.data.facebook,
          instagram: data.data.instagram,
          zipCode: data.data.zipCode,
        });
      }
    });
  };

  useEffect(() => {
    loadShop();
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
        updateShop(data.data, () => {
          setValues({ ...values, success: true, error: false, loading: false });
        });
      }
    });
  };

  const ShopForm = () => (
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
        <label>Post Code</label>
        <input
          onChange={handleChange("zipCode")}
          type="number"
          className="form-control"
          value={zipCode}
        />
      </div>
      <div className="form-group">
        <label>Facebook Link</label>
        <input
          onChange={handleChange("facebook")}
          type="text"
          className="form-control"
          value={facebook}
        />
      </div>
      <div className="form-group">
        <label>Instagram Link</label>
        <input
          onChange={handleChange("instagram")}
          type="text"
          className="form-control"
          value={instagram}
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
          backgroundColor: "#c0ffb3",
          minHeight: "8rem",
          padding: "2rem",
          marginBottom: "2rem",
        }}>
        <h1>Update Your Details</h1>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">{ShopForm()}</div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ShopSettings;
