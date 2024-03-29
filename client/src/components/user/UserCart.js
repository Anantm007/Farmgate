import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Footer from "../layout/Footer";
import CartItem from "./CartItem";
import { isAuthenticated } from "../userAuth";
import Navbar from "../layout/Navbar";
import { getCartTotal, checkPromo } from "../user/apiUser";

const UserCart = () => {
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    shipping: 0,
    // tax: user.newUser ? 0 : 0,
    tax: 0,
    subtotal: 0,
    promoCode: "",
    shopName: "",
    loading: false,
    success: false,
    // fortyPromoSuccess: false,
    // fortyDiscountGiven: false,
    twentyPromoSuccess: false,
    twentyDiscountGiven: false,
    error: false,
    total: 0,
  });

  let {
    shipping,
    tax,
    subtotal,
    total,
    success,
    // fortyPromoSuccess,
    // fortyDiscountGiven,
    twentyPromoSuccess,
    twentyDiscountGiven,
    error,
    promoCode,
    loading,
  } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();

    if (
      // (promoCode !== "fortyforfree" && user.newUser && shipping === 4.95) ||
      (promoCode !== "twofortwenty" && user.newUser && shipping === 4.95) ||
      (!user.newUser && shipping === 0) ||
      twentyDiscountGiven === true
    ) {
      setValues({
        ...values,
        error: "Promo Code already applied!",
        loading: false,
        success: false,
      });
      return;
    }

    checkPromo({ promoCode }).then((data) => {
      if (data && data.success === false) {
        setValues({
          ...values,
          error: data.message,
          success: false,
          // fortyPromoSuccess: false,
          // fortyDiscountGiven: false,
          twentyPromoSuccess: false,
          twentyDiscountGiven: false,
          loading: false,
        });
      } else {
        if (
          // data.promoApplied === "fortyforfree" &&
          // data.giveFortyDiscount === true

          data.promoApplied === "twofortwenty" &&
          data.giveTwentyDiscount === true
        ) {
          // let newSubtotal = subtotal - 40;
          let newSubtotal = subtotal - 20;
          if (newSubtotal < 0) {
            newSubtotal = 0;
          }
          const newShipping = user.newUser ? 9.9 : 4.95;

          setValues({
            ...values,
            subtotal: newSubtotal,
            promoCode: data.promoApplied,
            shipping: newShipping,
            tax: 0,
            total: getTotal(),
            // fortyPromoSuccess: `Congrats! Discount of (upto) $40 applied on this order`,
            // fortyDiscountGiven: true,
            twentyPromoSuccess: `Congrats! Discount of (upto) $20 applied on this order`,
            twentyDiscountGiven: true,
            success: true,
            error: false,
            loading: false,
          });
        } else if (
          // data.promoApplied === "fortyforfree" &&
          // data.giveFortyDiscount === false

          data.promoApplied === "twofortwenty" &&
          data.giveTwentyDiscount === false
        ) {
          const newShipping = user.newUser ? 9.9 : 4.95;

          setValues({
            ...values,
            promoCode: data.promoApplied,
            shipping: newShipping,
            tax: 0,
            total: getTotal(),
            // fortyPromoSuccess: `Promo Code applied. Apply this promo code on ${
            //   4 - data.appliedCounter - 1
            // } more orders to get upto $40 off.`,
            // fortyDiscountGiven: false,
            twentyPromoSuccess: `Promo Code applied. Apply this promo code on ${
              2 - data.appliedCounter - 1
            } more orders to get upto $20 off.`,
            twentyDiscountGiven: false,

            success: false,
            error: false,
            loading: false,
          });
          // } else if (data.promoApplied !== "fortyforfree" ) {
        } else if (data.promoApplied !== "twofortwenty") {
          setValues({
            ...values,
            shipping: shipping - 4.95,
            promoCode: data.promoApplied,
            tax: 0,
            total: getTotal(),
            // fortyPromoSuccess: false,
            // fortyDiscountGiven: false,
            twentyPromoSuccess: false,
            twentyDiscountGiven: false,
            success: true,
            error: false,
            loading: false,
          });
        }
      }
    });
  };

  const getTotal = () => {
    return (subtotal + shipping + tax).toFixed(2);
  };

  const getValues = () => {
    setValues({ ...values, loading: true });
    getCartTotal().then((data) => {
      if (data && data.success === true) {
        setValues({
          ...values,
          subtotal: data.data,
          total: (Math.round((data.data + tax + shipping) * 100) / 100).toFixed(
            2
          ),
          shipping: data.shipping,
          shopName: data.shopName,
          loading: false,
        });
      } else {
        setValues({ ...values, loading: false });
      }
    });
  };

  const showLoading = () => loading && <Spinner />;

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
        {promoCode} - Code applied successfully!
      </div>
    );
  };

  // const showFortySuccess = () => {
  //   return (
  //     <div
  //       className="alert alert-success"
  //       style={{ display: fortyPromoSuccess ? "" : "none" }}>
  //       {fortyPromoSuccess}
  //     </div>
  //   );
  // };

  const showTwentySuccess = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: twentyPromoSuccess ? "" : "none" }}>
        {twentyPromoSuccess}
      </div>
    );
  };

  const [run, setRun] = useState(false);

  useEffect(() => {
    getValues();
  }, [run]); // eslint-disable-line

  return (
    <Fragment>
      <Navbar run={run} />
      <br />
      <h1 className="text-center">
        {user.name.indexOf(" ") > 0
          ? user.name.split(" ").slice(0, -1)
          : user.name}
        's Shopping Cart
      </h1>

      {user.cart.length >= 1 ? (
        user.cart.map((item, i) => (
          <div key={i}>
            <CartItem item={item} run={run} setRun={setRun} />
          </div>
        ))
      ) : (
        <h1 className="text-center">You do not have any items in your cart</h1>
      )}

      <div className="row py-5 p-4 bg-white rounded shadow-sm">
        <div className="col-lg-6">
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
            Promotional Code
          </div>
          <div className="p-4">
            <p className="font-italic mb-4">
              Please enter any promo code that you have ?
            </p>
            <input
              onChange={handleChange("promoCode")}
              value={promoCode}
              className="form-control"></input>

            {/* <select
              onChange={handlePromoChange("promoCode")}
              value={promoCode}
              className="form-control">
              <option value="" disabled>
                Select
              </option>
              <option value="fortyforfree">fortyforfree</option>
              <option value="fromthefarmgate">fromthefarmgate</option>
              <option value="eatingisseasonallyadjusted">
                eatingisseasonallyadjusted
              </option>
            </select> */}
            <br />
            <button
              style={{ textAlign: "center" }}
              onClick={clickSubmit}
              className="btn btn-success btn-block">
              APPLY!
            </button>
            <br />
            {showSuccess()}
            {/* {showFortySuccess()} */}
            {showTwentySuccess()}
            {showError()}
          </div>

          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
            Delivery Address
          </div>
          <div className="p-4">
            <p className="font-italic mb-4">
              Please check your delivery address before proceeding
              forward. You can change your address in <Link to={'/user/' + user._id + '/settings'}>Settings</Link>
            </p>
            <textarea
              name=""
              cols="30"
              rows="4"
              className="form-control"
              value={`${user.address}, ${user.suburb}\n\nPostCode - ${user.zipCode}`}
              readOnly></textarea>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
            Order summary{" "}
          </div>
          <div className="p-4">
            <p className="font-italic mb-4">
              Shipping and additional costs are calculated as per the Australian
              laws.
            </p>
            <ul className="list-unstyled mb-4">
              {showLoading()}
              <li className="d-flex justify-content-between py-3 border-bottom">
                <strong className="text-muted">Order Subtotal</strong>
                <strong>${subtotal.toFixed(2)}</strong>
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
                <strong>(AUD) ${getTotal()}</strong>
              </li>
            </ul>
            {/* {user.cart.length >= 1 && (subtotal > 25 || fortyDiscountGiven) ? ( */}
            {user.cart.length >= 1 && (subtotal > 25 || twentyDiscountGiven) ? (
              <Link
                to={{
                  pathname: "/checkout",
                  state: {
                    subtotal: subtotal,
                    total: total,
                    tax: tax,
                    shipping: shipping,
                    promoCode,
                  },
                }}
                className="btn btn-dark rounded-pill py-2 btn-block">
                Proceed to checkout
              </Link>
            ) : (
              <Link
                to="/checkout"
                className="btn btn-dark rounded-pill py-2 btn-block disabled">
                Proceed to checkout
              </Link>
            )}
            {/* {subtotal <= 25 && !fortyDiscountGiven && ( */}
            {subtotal <= 25 && !twentyDiscountGiven && (
              <strong>* Min. subtotal amount allowed to checkout is $25</strong>
            )}
            <br />
            <br />
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default withRouter(UserCart);
