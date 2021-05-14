import React, { Fragment, useState } from "react";
import { addToCart, updateUser } from "../user/apiUser";
import Spinner from "../layout/Spinner";
import { isAuthenticated } from "../userAuth";
import { makeStyles } from "@material-ui/core/styles";

const ShopItem = ({
  item,
  index,
  setRun = (f) => f,
  run = undefined,
  showCartButton,
}) => {
  const styles = useStyles();

  const [values, setValues] = useState({
    success: false,
    error: "",
    loading: false,
  });

  const { success, error, loading } = values;

  const addCart = () => {
    if (!isAuthenticated()) {
      window.location.href = "/user/login";
    }
    setValues({ ...values, loading: true, error: false, success: false });
    addToCart(item._id).then((data) => {
      if (data && data.success === false) {
        setValues({
          ...values,
          success: false,
          error: data.message,
          loading: false,
        });
      } else {
        updateUser(data.data, () => {
          setValues({ ...values, success: true, error: false, loading: false });
        });
        setTimeout(() => setValues({ ...values, success: false }), 5000);
        let imgtodrag = document.getElementsByClassName("product")[index];
        let imgtodragImage = imgtodrag.querySelector(".hideImage");

        let disLeft = imgtodrag.getBoundingClientRect().left;
        let disTop = imgtodrag.getBoundingClientRect().top;
        let cartleft = 0.75 * window.screen.width;
        let carttop = 0.04 * window.screen.height;
        let image = imgtodragImage;

        image.style =
          "z-index: 1111; width: 100px;opacity:0.8; position:fixed; top:" +
          disTop +
          "px;left:" +
          disLeft +
          "px;transition: left 2s, top 2s, width 2s, opacity 2s cubic-bezier(1, 1, 1, 1)";
        var rechange = document.body.appendChild(image);

        setRun(!run);
        setTimeout(function () {
          image.style.left = cartleft + "px";
          image.style.top = carttop + "px";
          image.style.width = "40px";
          image.style.opacity = "0";
        }, 200);
        setTimeout(function () {
          rechange.parentNode.removeChild(rechange);
        }, 2000);
      }
    });
  };

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
        style={{ display: success === true ? "" : "none" }}>
        Item added to cart successfully!
      </div>
    );
  };

  const showLoading = () => loading && <Spinner />;

  return (
    <Fragment>
      <div className="row">
        {loading ? (
          showLoading()
        ) : (
          <div
            className="product"
            style={{ margin: "2rem", minWidth: "22rem" }}>
            <div className="flip-card-inner" key={index}>
              <div className={styles.mainDiv}>
                <div className={styles.saleBadge}>
                  {item.inSale && (
                    <span
                      className="badge badge-primary badge-pill"
                      style={{ padding: "0.8rem" }}>
                      SPECIAL!
                    </span>
                  )}
                </div>
                <img
                  src={item.photo}
                  className={styles.itemImage}
                  alt="itemImage"
                />
                <br />
                <strong style={{ fontSize: "1.3rem" }}>{item.name}</strong>
                <hr />
                <p className="p-1">
                  {success
                    ? showSuccess()
                    : error
                    ? showError()
                    : item.description}
                </p>
                <div>
                  <strong className={styles.priceStyle}>
                    {!success &&
                      !error &&
                      "$" + item.price.toFixed(2) + " per " + item.variant}
                  </strong>
                </div>
                <br />
                <img
                  src={item.photo}
                  className="hideImage"
                  style={{ height: "0", width: "0" }}
                  alt="img"
                />
                {item.inStock && showCartButton && (
                  <button
                    className="btn btn-block btn-danger"
                    style={{
                      width: "90%",
                      margin: "auto",
                    }}
                    onClick={addCart}>
                    ADD TO CART
                  </button>
                )}
                <br />
                <span className="badge badge-success badge-pill">
                  {item.quality}
                </span>
                <br />
                <br />
              </div>
            </div>
          </div>
        )}
      </div>
      {!showCartButton && <div className={styles.mb9}></div>}
    </Fragment>
  );
};

const useStyles = makeStyles({
  saleBadge: {
    textAlign: "left",
    padding: ".5rem",
  },
  mainDiv: {
    borderRadius: ".5em",
    border: ".1px solid black",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  itemImage: {
    height: "10rem",
    margin: "1rem 1.1rem 1rem 1.1rem",
  },
  priceStyle: {
    fontSize: "1.2rem",
    color: "darkgreen",
  },
  mb9: {
    marginBottom: "9rem",
  },
});

export default ShopItem;
