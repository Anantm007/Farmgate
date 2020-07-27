import React, { Fragment, useState, useEffect } from "react";
import { getCertificate } from "../certificate/apiCertificates";
import { updateCertificate } from "./apiAdmin";
import Footer from "../layout/Footer";
import Spinner from "../layout/Spinner";

const AdminEditCertificate = (props) => {
  const certiId = props.match.params.certificateId;

  const [values, setValues] = useState({
    name: "",
    url: "",
    error: "",
    success: false,
    loading: false,
  });

  const { name, url, error, success, loading } = values;

  const loadCertificate = () => {
    setValues({ ...values, loading: true });
    getCertificate(certiId).then((data) => {
      if (data.success === false) {
        setValues({ ...values, error: data.message, loading: false });
      } else {
        setValues({
          ...values,
          name: data.certificate.name,
          url: data.certificate.url,
          loading: false,
        });
      }
    });
  };

  useEffect(() => {
    loadCertificate();
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateCertificate(certiId, values).then((data) => {
      if (data.success === false) {
        setValues({ ...values, error: data.message });
      } else {
        setValues({
          ...values,
          name: data.certificate.name,
          url: data.certificate.url,
          loading: false,
          error: "",
          success: true,
        });
      }
    });
  };

  const editCertiForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      {showLoading()}

      <div className="form-group">
        <label>Name*</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
          required
        />
      </div>

      <div className="form-group">
        <label>URL*</label>
        <input
          onChange={handleChange("url")}
          className="form-control"
          value={url}
          required
        />
      </div>

      <br />
      <div className="text-center">
        <button className="btn btn-outline-primary">Edit Certificate</button>
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
        Certificate updated Succesfully
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
        <h1>Edit Certificate</h1>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">{editCertiForm()}</div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default AdminEditCertificate;
