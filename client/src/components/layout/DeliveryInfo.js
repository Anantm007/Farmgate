import React, { Fragment } from "react";
import { About3 } from "../../images";

import { makeStyles } from "@material-ui/core/styles";

const DeliveryInfo = () => {
  const styles = useStyles();

  return (
    <Fragment>
      <div className="bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5 px-5 mx-auto">
              <img
                src={About3}
                alt=""
                className="img-fluid mb-4 mb-lg-0"
                style={{
                  boxShadow:
                    "0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 10px 30px 0 rgba(0, 0, 0, 0.19)",
                }}
              />
            </div>
            <div className="col-lg-6">
              <h2 className={styles.heading}>
                We deliver from the farm gate to your door step
              </h2>
              <p
                className="font-italic text-muted mb-4"
                style={{ fontSize: "1.2em" }}>
                Adelaide metropolitan and outer metropolitan areas only (see the
                terms & conditions linked below for a definition of the Service
                Area){" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles({
  heading: {
    fontFamily: "Arvo, serif",
    fontSize: "1.9em",
  },
});

export default DeliveryInfo;
