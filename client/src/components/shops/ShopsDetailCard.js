import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../userAuth";
import { countItems } from "./apiShops";
import BASE_URL from "../../utils/baseUrl";

const ShopsCard = ({ shop }) => {
  const [noOfItems, setNoOfItems] = useState(0);
  const { user } = isAuthenticated();
  let role;

  const CountItems = () => {
    countItems(shop._id).then((data) => {
      if (data.success === true) setNoOfItems(data.data);
    });
  };

  useEffect(() => {
    CountItems();
    //eslint-disable-next-line
  }, []);

  if (user) {
    role = user.role;
  }

  return (
    <Fragment>
      <div className="card" style={{ minHeight: "37rem" }}>
        <div className="image">
          <img
            src={`${BASE_URL}/api/shops/photo/${shop._id}`}
            alt=""
            style={{ height: "15rem" }}
          />
        </div>
        <div className="card-inner">
          <div className="header">
            <h2>{shop.name}</h2> <br />
            <h6>{shop.address}</h6>
            <h6>Items Available: {noOfItems}</h6> <br />
          </div>
          <div className="content">
            <p>{shop.description.substring(0, 100)}...</p>
            {role !== undefined && role === 0 && (
              <Link to={`/shops/${shop._id}`} style={{ color: "white" }}>
                <button
                  className="btn btn-primary btn-block"
                  style={{ backgroundColor: "#0000FF" }}>
                  Order Now
                </button>
              </Link>
            )}
            {role !== undefined && role === 1 && (
              <div>
                <Link to={`/admin/shops/${shop._id}`}>
                  <button className="btn btn-block btn-warning">
                    Edit Items
                  </button>
                </Link>
                <br />
                <Link to={`/admin/shops/${shop._id}/certificates`}>
                  <button className="btn btn-block btn-warning">
                    Edit Certificates
                  </button>
                </Link>
              </div>
            )}
            {role === undefined && (
              <Link to={`/shops/${shop._id}`} style={{ color: "white" }}>
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: "#0000FF" }}>
                  Order Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopsCard;
