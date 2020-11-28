import React, { Fragment, useState, useEffect } from "react";
import { listShops } from "./apiAdmin";
import AdminInvoice from "./AdminInvoice";
import Footer from "../layout/Footer";
import Spinner from "../layout/Spinner";

const InvoiceListShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState();

  const loadShops = () => {
    setLoading(true);
    listShops().then((data) => {
      if (data && data.success === false) {
        setLoading(false);
      } else {
        setShops(data.data);
        setLoading(false);
      }
    });
  };

  const showLoading = () => loading && <Spinner />;

  useEffect(() => {
    loadShops();
    //eslint-disable-next-line
  }, []);

  return loading ? (
    <div>{showLoading()}</div>
  ) : (
    <Fragment>
      <div
        style={{
          backgroundColor: "#c0ffb3",
          minHeight: "8rem",
          padding: "2rem",
          marginBottom: "2rem",
        }}>
        <h1>Admin Dashboard</h1>
        <h5>{`Welcome, Admin`}</h5>
      </div>

      <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
        GENERATE INVOICES FOR SHOPS
      </h1>
      <br />
      {showLoading()}

      <div className="row shop-container container-fluid">
        {shops.map((shop, i) => (
          <div key={i} className="col-sm-4">
            <AdminInvoice shop={shop} />
          </div>
        ))}
      </div>
      <Footer />
    </Fragment>
  );
};

export default InvoiceListShops;
