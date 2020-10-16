import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../utils/baseUrl";

const ShopItems = ({ item }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="flip-card" style={{ margin: "2rem" }}>
          <div
            className="flip-card-inner"
            style={{
              backgroundImage: `url(${BASE_URL}/api/items/photo/${item._id}`,
              backgroundSize: "19rem 20rem",
            }}>
            <div className="flip-card-front">
              <h4 style={{ backgroundColor: "#d4ebd0" }}>{item.name}</h4>
              <h6>{`$ ${item.price} / ${item.variant}`}</h6>
              {item.inStock ? (
                <span className="badge badge-primary badge-pill">In Stock</span>
              ) : (
                <span className="badge badge-danger badge-pill">
                  Out of Stock
                </span>
              )}{" "}
              <br />
              <br />
              <button className="btn btn-danger">
                <Link
                  to={`/admin/update/item/${item._id}`}
                  style={{ color: "white" }}>
                  Edit Item
                </Link>
              </button>
            </div>

            <div className="flip-card-back">
              <p>{item.description}</p>
              <span className="badge badge-success badge-pill">
                {item.quality}
              </span>
              <br />
              <br />
              {item.inStock && (
                <button className="btn btn-danger">
                  <Link
                    to={`/admin/update/item/${item._id}`}
                    style={{ color: "white" }}>
                    Edit Item
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopItems;
