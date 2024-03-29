import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import Footer from "../layout/Footer";
import { isAuthenticated } from "../userAuth";
import { Pay, updateUser, createOrder } from "./apiUser";
import { withRouter } from "react-router-dom";

const Checkout = (props) => {
  const { user } = isAuthenticated();

  const check = () => {
    if (!props.location.state) {
      window.location = `/cart`;
    }

    if (user.cart.length < 0) {
      window.location = "/cart";
    }

    if (
      props.location.state &&
      (props.location.state.tax < 0 || props.location.state.shipping < 0)
    ) {
      window.location = "/cart";
    }

    if (
      props.location.state.subtotal < 25 &&
      // props.location.state.promoCode !== "fortyforfree"
      props.location.state.promoCode !== "twofortwenty"
    ) {
      window.location = "/cart";
    }
  };

  const [values, setValues] = useState({
    shipping: props.location.state ? props.location.state.shipping : 4.5,
    tax: 0,
    subtotal: props.location.state ? props.location.state.subtotal : 0,
    promoCode: props.location.state ? props.location.state.promoCode : "",
    loading: false,
    instructions: "",
    EWAY_CARDNAME: "",
    EWAY_CARDNUMBER: "",
    EWAY_CARDEXPIRYMONTH: "",
    EWAY_CARDEXPIRYYEAR: "",
    EWAY_CARDCVN: "",
    paymentSuccess: false,
    success: false,
    error: "",
    total: 0,
  });

  const {
    shipping,
    tax,
    instructions,
    subtotal,
    promoCode,
    success,
    paymentSuccess,
    error,
    loading,
  } = values;
  const {
    EWAY_CARDCVN,
    EWAY_CARDEXPIRYMONTH,
    EWAY_CARDEXPIRYYEAR,
    EWAY_CARDNAME,
    EWAY_CARDNUMBER,
  } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  // cart values
  const cartTotal = () => {
    return subtotal;
  };

  const Total = () => {
    return cartTotal() === 0 ? 0 : (cartTotal() + shipping + tax).toFixed(2);
  };

  useEffect(() => {
    check();
    //eslint-disable-next-line
  }, []);

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values });
    buy();
  };

  const buy = () => {
    setValues({ ...values, loading: true });
    let amount = subtotal + tax + shipping;
    Pay({
      EWAY_CARDNUMBER,
      EWAY_CARDNAME,
      EWAY_CARDEXPIRYYEAR,
      EWAY_CARDEXPIRYMONTH,
      EWAY_CARDCVN,
      amount,
    }).then((data) => {
      if (data && data.success === false) {
        setValues({ ...values, error: true, loading: false });
      } else {
        setValues({
          ...values,
          success: true,
          paymentSuccess: true,
          loading: false,
        });
        let data = {
          instructions,
          subtotal,
          tax_shipping: tax + shipping,
          totalAmount: subtotal + tax + shipping,
          promoCode,
        };
        createOrder(user._id, data).then((data) => {
          if (data && data.success === false) {
            setValues({ ...values, success: false, error: data.message });
          } else {
            updateUser(data.data, () => {
              setValues({ ...values, success: true, loading: false });
              window.setTimeout(function () {
                window.location.href = `/user/${user._id}/orders`;
              }, 200);
            });
          }
        });
      }
    });
  };

  const showDropIn = () => (
    <div className="padding">
      <div className="row">
        <div className="col-sm-7">
          <div className="card">
            <div className="card-header">
              <strong>Pay With Card</strong>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label for="name">Name</label>
                      <input
                        className="form-control"
                        onChange={handleChange("EWAY_CARDNAME")}
                        value={EWAY_CARDNAME}
                        type="text"
                        placeholder="Name on the card"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label for="ccnumber">Credit Card Number</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          onChange={handleChange("EWAY_CARDNUMBER")}
                          value={EWAY_CARDNUMBER}
                          placeholder="Your credit card number"
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="mdi mdi-credit-card"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-4">
                    <label for="ccmonth">Card Expiry Month</label>
                    <input
                      className="form-control"
                      type="number"
                      onChange={handleChange("EWAY_CARDEXPIRYMONTH")}
                      value={EWAY_CARDEXPIRYMONTH}
                      placeholder="MM"
                    />
                  </div>
                  <div className="form-group col-sm-4">
                    <label for="ccyear">Card Expiry Year</label>
                    <input
                      className="form-control"
                      type="number"
                      onChange={handleChange("EWAY_CARDEXPIRYYEAR")}
                      value={EWAY_CARDEXPIRYYEAR}
                      placeholder="YYYY"
                    />
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="cvv">CVV/CVC</label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={handleChange("EWAY_CARDCVN")}
                        value={EWAY_CARDCVN}
                        placeholder="XXX"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  {!success && (
                    <button
                      onClick={clickSubmit}
                      disabled={loading}
                      className="btn btn-block btn-success"
                      type="submit">
                      <i className="mdi mdi-gamepad-circle"></i> PAY
                    </button>
                  )}
                  <strong>
                    * We don't collect or retain (per our terms and conditions)
                    your payment data - we encrypt it and send it to{" "}
                    <a
                      href="https://eway.io/"
                      target="_blank"
                      rel="noopener noreferrer">
                      eway
                    </a>{" "}
                    (Australia's number one payment gateway provider) for
                    decryption
                  </strong>
                </div>
                <div id="eWAYBlock">
                  <div
                    style={{
                      textAalign: "center;",
                      width: "15rem",
                      margin: "auto",
                    }}>
                    <a
                      href="https://www.eway.com.au/secure-site-seal?i=12&se=3&theme=0"
                      title="eWAY Payment Gateway"
                      target="_blank"
                      rel="noopener noreferrer">
                      <img
                        alt="eWAY Payment Gateway"
                        src="https://www.eway.com.au/developer/payment-code/verified-seal.php?img=12&size=3&theme=0"
                      />
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}>
        Transaction Failed! Please fill correct information
      </div>
    );
  };

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}>
      Your payment was successful! Please wait, we are processing your order....
    </div>
  );

  const showPaymentSuccess = (paymentSuccess) => (
    <div className="alert" style={{ display: paymentSuccess ? "" : "none" }}>
      <Spinner />
    </div>
  );
  const showLoading = () => loading && <Spinner />;

  return (
    <Fragment>
      <br />
      <h1 className="text-center">Checkout Page</h1>

      <div className="row py-5 p-4 bg-white rounded shadow-sm">
        <div className="col-lg-6">
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
            Order summary{" "}
          </div>
          <div className="p-4">
            <ul className="list-unstyled mb-4">
              <li className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Total Items</strong>
                <strong>{user.cart.length}</strong>
              </li>
              <li className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Deliver To</strong>
                <strong>{user.name}</strong>
              </li>
              <li className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Delivery Address</strong>
                <strong>
                  {user.address} (Suburb - {user.suburb})
                </strong>
              </li>
              {showLoading()}
              <li className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Order Subtotal</strong>
                <strong>${cartTotal().toFixed(2)}</strong>
              </li>
              <li className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Shipping and handling</strong>
                <strong>${shipping.toFixed(2)}</strong>
              </li>
              <li className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">GST (@0%)</strong>
                <strong>${tax.toFixed(2)}</strong>
              </li>
              <li className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Total</strong>
                <strong>${Total()}</strong>
              </li>
            </ul>

            <h6>
              * Your order should be delivered within 7 days (delivery days were
              stipulated when you added items to your cart)
            </h6>
            <h6>
              ** Your bank statement will show debits to{" "}
              <strong>Farmgate Ag</strong> (our trading name)
            </h6>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
            INSTRUCTIONS
          </div>
          <div className="p-4">
            <p className="font-italic mb-4">
              If you have any special delivery instructions for the delivery
              driver or packing instructions for the supplier you can leave them
              in the box below
            </p>
            <textarea
              onChange={handleChange("instructions")}
              value={instructions}
              cols="30"
              rows="3"
              className="form-control"></textarea>
          </div>
        </div>
      </div>
      {showDropIn()}
      {showSuccess(success)}
      {showError(error)}
      {showPaymentSuccess(paymentSuccess)}

      <Footer />
    </Fragment>
  );
};

export default withRouter(Checkout);
