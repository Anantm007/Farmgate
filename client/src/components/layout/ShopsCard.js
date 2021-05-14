import React, { Fragment } from "react";

const ShopsCard = ({ shop }) => {
  return (
    <Fragment>
      <section id="team" className="pb-5">
        <div className="container">
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
                <h4 className="card-title">{shop.name}</h4>
                <p className="card-text">{shop.address}</p>
                <h6>Items Available: {shop.items.length}</h6>
                <p>{shop.description.substring(0, 50)}... </p>
                <a href={`/shops/${shop._id}`} style={{ color: "black" }}>
                  <button className="btn btn-primary">ORDER NOW</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ShopsCard;
