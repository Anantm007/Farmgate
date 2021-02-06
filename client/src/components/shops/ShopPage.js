import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getShop, getItems, getCertificates } from "../shops/apiShops";
import { isAuthenticated } from "../userAuth";
import Pagination from "./Pagination";
import Footer from "../layout/Footer";
import Spinner from "../layout/Spinner";
import Navbar from "../layout/Navbar";
import ShopListItems from "./ShopListItems";
import BASE_URL from "../../utils/baseUrl";

import { makeStyles } from "@material-ui/core/styles";

const ShopPage = (props) => {
  const styles = useStyles();

  const shopId = props.match.params.id;
  const [shop, setShop] = useState([]);
  const [items, setItems] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadShop = () => {
    getShop(shopId).then((data) => {
      if (data && data.success === false) {
        setError(data.message);
        setLoading(true);
      } else {
        setShop(data.data);
        setLoading(false);
      }
    });
  };

  const loadItems = () => {
    getItems(shopId).then((data) => {
      if (data && data.success === false) {
        setError(data.message);
      } else {
        if (data.count === 0) {
          setError(data.message);
        } else {
          setItems(data.data);
        }
      }
    });
  };

  const loadCertificates = () => {
    getCertificates(shopId).then((data) => {
      if (data && data.success === false) {
        // setError(data.message);
      } else {
        setCertificates(data.certificates);
      }
    });
  };

  const showLoading = () => loading && <Spinner />;

  const showError = () => error && <h3 className="text-center">{error}</h3>;

  const [run, setRun] = useState(false);

  useEffect(() => {
    loadShop();
    loadItems();
    loadCertificates();
    if (!isAuthenticated()) {
      localStorage.setItem(
        "redirectUrl",
        JSON.stringify(window.location.pathname)
      );
    }
    return () => {
      console.log("cleaned up");
    };
  }, [run]); // eslint-disable-line

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <Navbar run={run} />
      {loading ? (
        <div>{showLoading()}</div>
      ) : (
        <Fragment>
          <h1 className={styles.shopNameStyle}>{shop.name}</h1>

          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div style={{ marginTop: "2rem" }}>
                  <strong>Address: </strong>
                  {shop.address}
                  <br />
                  <br />
                  <strong>About: </strong>
                  {shop.description}
                  <br />
                  <br />
                  <strong>Items Available: </strong>
                  {shop.items.length}
                  <br />
                  <br />
                  <table>
                    <tbody>
                      <tr>
                        <th></th>
                        <th>Weekly Delivery 1</th>
                        <th>Weekly Delivery 2</th>
                      </tr>
                      <tr>
                        <td>
                          <strong>Order cut-off day/time:</strong>
                        </td>
                        <td>Tuesday, 3pm</td>
                        <td>Thursday, 3pm</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Delivery by:</strong>
                        </td>
                        <td>Wednesday, 3pm*</td>
                        <td>Friday, 3pm*</td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <br />

                  {certificates.length > 0 && (
                    <Fragment>
                      <strong>
                        <mark>CERTIFICATIONS for {shop.name}</mark>:
                      </strong>
                      <br />
                      <br />
                      {certificates.map((certi, index) => (
                        <a
                          href={certi.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={index}>
                          <span style={{ color: "black" }}>•</span> {certi.name}{" "}
                          <br />
                        </a>
                      ))}
                      <br />
                      <br />
                    </Fragment>
                  )}

                  {shop.facebook !== undefined && (
                    <Fragment>
                      <strong>Facebook Page: &nbsp;</strong>
                      <a
                        href={shop.facebook}
                        target="_blank"
                        rel="noopener noreferrer">
                        {shop.facebook}
                      </a>
                      <br />
                      <br />
                    </Fragment>
                  )}

                  {shop.instagram !== undefined && (
                    <Fragment>
                      <strong>Instagram Page: &nbsp;</strong>
                      <a
                        href={shop.instagram}
                        target="_blank"
                        rel="noopener noreferrer">
                        {shop.instagram}
                      </a>
                      <br />
                      <br />
                    </Fragment>
                  )}

                  {shop.website !== undefined && (
                    <Fragment>
                      <strong>Website: &nbsp;</strong>
                      <a
                        href={shop.website}
                        target="_blank"
                        rel="noopener noreferrer">
                        {shop.website}
                      </a>
                      <br />
                      <br />
                    </Fragment>
                  )}
                </div>
              </div>

              <div className="col-lg-8">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide my-4"
                  data-ride="carousel">
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                      <div className={styles.shopImageStyle}>
                        <img
                          className="d-block img-fluid"
                          alt=""
                          src={`${BASE_URL}/api/shops/photo/${shop._id}`}
                          style={{
                            marginTop: "2rem",
                            height: "30rem",
                            width: "30rem",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <h3 style={{ textAlign: "center" }}>Shop Items Available</h3>
                {showError()}
                <br />

                <ShopListItems
                  items={currentItem}
                  loading={loading}
                  setRun={setRun}
                  run={run}
                />
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={items.length}
                  paginate={paginate}
                  pageNumber={currentPage}
                />
              </div>
            </div>
          </div>

          {!loading && (
            <div className="text-center mt-5">
              <Link to="/cart">
                <button className="btn btn-dark" style={{ width: "12rem" }}>
                  <i className="fa fa-shopping-cart">&nbsp;&nbsp;</i>Go To Cart
                </button>
              </Link>
            </div>
          )}

          <div style={{ fontStyle: "italic", margin: "5rem 3rem" }}>
            <strong>* Note:&nbsp; Certain areas</strong> (principally some outer
            metro) <strong>are defined in the T&C</strong> (link from home page,
            see Appendix B) <strong>as within the Limited Service Area.</strong>{" "}
            Delivery for these areas is principally expected the morning
            following the delivery day stipulated above (we will attempt to
            contact you if we foresee any procurement issues).
          </div>

          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

const useStyles = makeStyles({
  shopNameStyle: {
    textAlign: "center",
    marginTop: "2rem",
  },
  shopImageStyle: {
    "@media screen and (min-width: 576px)": {
      marginLeft: "8rem",
      marginTop: "-2rem",
    },
  },
});

export default ShopPage;
