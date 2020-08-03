import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import { getItemsAllType } from "../shops/apiShops";
import { deleteItem } from "./apiItems";
import Spinner from "../layout/Spinner";
import ShopItems from "../shops/ShopItems";

const MyShopItems = (props) => {
  const shopId = props.match.params.id;

  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadItems = () => {
    getItemsAllType(shopId).then((data) => {
      if (data.success === false) {
        setError(data.message);
        setLoading(true);
      } else {
        if (data.count === 0) {
          setError(data.message);
        } else {
          setItems(data.data);
        }

        setLoading(false);
      }
    });
  };

  const DeleteItem = (Id) => {
    deleteItem(Id).then((data) => {
      if (items.length === 0) {
        setError("No Items Left");
      }
      if (data.success === false) {
        setLoading(false);
      } else {
        loadItems();
        setLoading(false);
      }
    });
  };

  const showLoading = () => loading && <Spinner />;

  const showError = () => error && <h3 className="text-center">{error}</h3>;

  useEffect(() => {
    loadItems();
    //eslint-disable-next-line
  }, []);

  return loading ? (
    showLoading()
  ) : (
    <Fragment>
      <div
        style={{
          backgroundColor: "#c0ffb3",
          minHeight: "8rem",
          padding: "2rem",
          marginBottom: "2rem",
        }}>
        <h1>Manage Your Shop Items</h1>
        <h5>{`Welcome`}</h5>
      </div>

      <br />

      {showError()}

      <div className="row">
        {items.length > 0 &&
          items.map((item, i) => (
            <div key={i} className="col-xs-12 col-sm-6 col-md-6 ">
              <ShopItems item={item} showCartButton={false} />
              <br />
              <br />
              <br />
              <br />
              <div className="ml-5">
                <Link
                  to={`/shop/${shopId}/item/${item._id}`}
                  style={{ color: "white" }}>
                  <button className="btn btn-primary mt-4">UPDATE</button>
                </Link>
                &nbsp;
                <button
                  onClick={() => DeleteItem(item._id)}
                  className="btn btn-danger mt-4">
                  DELETE
                </button>
              </div>
              <br />
            </div>
          ))}
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Footer />
    </Fragment>
  );
};

export default MyShopItems;
