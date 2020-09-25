import React, { Fragment } from "react";
import About2 from "../../images/about2.jpg";

import { makeStyles } from "@material-ui/core/styles";

const AboutUs = () => {
  const styles = useStyles();

  return (
    <Fragment>
      <div className="bg-light">
        <div className="container py-5">
          <div className="row h-300 align-items-center py-5">
            <div className="col-lg-6">
              <h1 className={styles.heading}>About Us</h1>
              <p
                className="font-italic text-muted mb-4"
                style={{ fontSize: "1.2em" }}>
                Trading as Farmgate Ag, we are an IT company from farming grass
                roots, with a passion for quality food, and supporting healthy
                physiology!
              </p>
              <br />
              {/* <p className="font-italic text-muted mb-4" style={{fontSize: '1.2em'}}>We provide a service to deliver produce from the farm gate to the consumer door step.</p><br/> */}
              <p
                className="font-italic text-muted mb-4"
                style={{ fontSize: "1.2em" }}>
                In this age of decentralisation, our aim is to establish markets
                that support farmers, and provide logistics to assist in the
                delivery of quality goods.
              </p>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src={About2}
                alt="img"
                className="img-fluid"
                style={{
                  boxShadow:
                    "0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 10px 30px 0 rgba(0, 0, 0, 0.19)",
                }}
              />
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
    fontSize: "2.5em",
  },
});

export default AboutUs;
