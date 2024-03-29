import React, { Fragment, useEffect, useState } from "react";
import { isAuthenticated } from "../userAuth";
import Footer from "../layout/Footer";
import { listOrders, repeatOrder } from "./apiUser";
import Moment from "moment";
import Spinner from "../layout/Spinner";

const UserOrders = () => {
  const {
    user: { _id, name },
  } = isAuthenticated();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    setLoading(true);
    listOrders(_id).then((data) => {
      if (data && data.success === false) {
        setLoading(false);
      } else {
        setOrders(data.data);
        setLoading(false);
      }
    });
  };

  const showStatus = (o) => {
    return (
      <div className="form-group">
        <h6 className="mark mb-4">Status: {o.status}</h6>
      </div>
    );
  };

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return <h4 className="text-danger">Total Orders: {orders.length}</h4>;
    } else if (!loading) {
      return (
        <Fragment>
          <h1 className="text-danger">No Orders</h1>
          <br />
          <br />
          <br />
          <h2 className="text-danger">
            Any order you make will be listed here
          </h2>
          <br />
          <br />
          <br />
        </Fragment>
      );
    }
  };

  const duplicateOrder = async (orderId) => {
    setLoading(true);
    repeatOrder(orderId, _id).then((data) => {
      if (data && data.success === false) {
        setLoading(false);
      } else {
        let auth = JSON.parse(localStorage.getItem("jwt"));
        auth.user = data.data;

        localStorage.setItem("jwt", JSON.stringify(auth));

        window.location.href = "/cart";
        setLoading(false);
      }
    });
  };

  const showLoading = () => loading && <Spinner />;

  useEffect(() => {
    loadOrders();
    showLoading();
    // eslint-disable-next-line
  }, []);

  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
        </div>
        <input type="text" className="form-control" value={value} readOnly />
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

      <h2 className="text-center">MY ORDERS</h2>
      {showLoading()}
      <div className="row">
        <div className="xs-col-12 col-sm-8">
          {showOrdersLength()}

          {orders.map((o, oIndex) => {
            return (
              <div
                key={oIndex}
                className="mt-5"
                style={{
                  borderBottom: "5px solid indigo",
                }}>
                <ul className="list-group mb-2">
                  <li
                    className="list-group-item"
                    style={{ fontWeight: "bold" }}>
                    Order Id: {o._id}
                  </li>
                  <li
                    className="list-group-item"
                    style={{ fontWeight: "bold" }}
                    onClick={() => duplicateOrder(o._id)}>
                    <button className="btn btn-primary"> REPEAT ORDER! </button>
                  </li>
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    <strong>Total Amount:</strong> ${o.totalAmount.toFixed(3)}
                  </li>
                  <li className="list-group-item">
                    <strong>Ordered From:</strong> {o.shopName}
                  </li>
                  <li className="list-group-item">
                    <strong>Order Date:</strong>{" "}
                    {Moment(o.createdAt).format("YYYY/MM/DD")}
                  </li>
                  <li className="list-group-item">
                    <strong>Instructions:</strong> {o.instructions}
                  </li>
                  <li className="list-group-item">
                    <strong>Total Items:</strong> {o.items.length}
                  </li>
                </ul>

                {o.items.map((p, pIndex) => (
                  <div
                    className="mb-4"
                    key={pIndex}
                    style={{ padding: "20px" }}>
                    {showInput("Item Name", p.itemName)}
                    {showInput("Item Quantity", p.quantity + " X " + p.variant)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default UserOrders;
