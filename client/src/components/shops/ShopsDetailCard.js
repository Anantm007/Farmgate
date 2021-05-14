import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../userAuth";

import { makeStyles } from "@material-ui/core/styles";

const ShopsCard = ({ shop }) => {
  const styles = useStyles();

  const { user } = isAuthenticated();
  let role;

  if (user) {
    role = user.role;
  }

  return (
    <Fragment>
      <section id="team" className="pb-5">
        <div className="container">
          <div className={styles.shopCard}>
            <div className="frontside">
              <div
                className="card"
                style={{
                  border: "0.4px solid",
                  boxShadow:
                    "0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 10px 30px 0 rgba(0, 0, 0, 0.19)",
                }}>
                <div className="card-body text-center">
                  <p>
                    <img
                      className=" img-fluid"
                      src={shop.photo}
                      alt="cardimage"
                    />
                  </p>
                  <h3>{shop.name}</h3> <br />
                  <p className="card-text" style={{ textAlign: "left" }}>
                    {shop.address}
                  </p>
                  <h6 style={{ textAlign: "left" }}>
                    Items Available: {shop.items.length}
                  </h6>
                  <br />
                  <div className="content">
                    <p style={{ textAlign: "left" }}>
                      {shop.description.substring(0, 100)}...
                    </p>

                    {role !== undefined && role === 0 && (
                      <Link
                        to={`/shops/${shop._id}`}
                        style={{ color: "white" }}>
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
                      <Link
                        to={`/shops/${shop._id}`}
                        style={{ color: "white" }}>
                        <button
                          className="btn btn-primary btn-block"
                          style={{ backgroundColor: "#0000FF" }}>
                          Order Now
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const useStyles = makeStyles({
  shopCard: {
    minHeight: "37rem",
  },
});

export default ShopsCard;
