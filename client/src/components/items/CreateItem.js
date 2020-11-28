import React, { Fragment, useState, useEffect } from "react";
import { createItem } from "./apiItems";
import Footer from "../layout/Footer";
import Spinner from "../layout/Spinner";

const CreateItem = () => {
  const [values, setValues] = useState({
    name: "",
    image: "",
    price: "",
    variant: "",
    quality: "",
    description: "",
    inSale: "",
    loading: false,
    error: "",
    success: false,
    formData: "",
  });

  const {
    name,
    price,
    variant,
    quality,
    description,
    inSale,
    loading,
    error,
    success,
    formData,
  } = values;

  // load categories and form set data
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
    setValues({ ...values, error: "", loading: true });

    createItem(formData).then((data) => {
      if (data && data.success === false) {
        setValues({ ...values, loading: false, error: data.message });
      } else {
        setValues({
          ...values,
          name: "",
          image: "",
          price: "",
          variant: "",
          quality: "",
          description: "",
          inSale: "",
          loading: false,
          error: "",
          success: true,
          formData: new FormData(),
        });
      }
    });
  };

  const newItemForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <h6>Item image (less than 1MB)</h6>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("image")}
            type="file"
            name="image"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label>Type per price</label>
        <select
          onChange={handleChange("variant")}
          className="form-control"
          value={variant}>
          <option>Select</option>
          <option value="100 g.">100 g.</option>
          <option value="125 g.">125 g.</option>
          <option value="150 g.">150 g.</option>
          <option value="200 g.">200 g.</option>
          <option value="250 g.">250 g.</option>
          <option value="300 g.">300 g.</option>
          <option value="500 g.">500 g.</option>
          <option value="1 Kg.">1 Kg.</option>
          <option value="1.5 Kg.">1.5 Kg.</option>
          <option value="2 Kg.">2 Kg.</option>
          <option value="5 Kg.">5 Kg.</option>
          <option value="Half Dozen">Half Dozen</option>
          <option value="Dozen">Dozen</option>
          <option value="Each">Each</option>
          <option value="Container">Container</option>
          <option value="Bag">Bag</option>
          <option value="Bunch">Bunch</option>
          <option value="Punnet">Punnet</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quality</label>
        <select
          onChange={handleChange("quality")}
          className="form-control"
          value={quality}>
          <option>Select</option>
          <option value="Organic">Oragnic</option>
          <option value="Certified Organic">Certified Organic</option>
          <option value="Recycled">Recycled</option>
          <option value="BioDynamic">Biodynamic</option>
          <option value="Pesticide Free">Pesticide Free</option>
          <option value="Organic (not certified)">
            Organic (not certified)
          </option>
          <option value="No Category">No Category</option>
        </select>
      </div>

      <div className="form-group">
        <label>In Sale</label>
        <select
          onChange={handleChange("inSale")}
          className="form-control"
          value={inSale}>
          <option>Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <br />

      <div className="text-center">
        <button className="btn btn-outline-primary">Create Item</button>
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
        Item added Succesfully
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
        <h1>Add Items to your shop</h1>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">{newItemForm()}</div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default CreateItem;
