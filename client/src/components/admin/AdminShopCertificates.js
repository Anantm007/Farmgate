import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import { listCertificates } from "../certificate/apiCertificates";
import { deleteCertificate } from "./apiAdmin";
import { isAuthenticated } from "../userAuth";
import Spinner from "../layout/Spinner";

const AdminShopCertificates = (props) => {
  const {
    user: { name },
  } = isAuthenticated();
  const _id = props.match.params.id;

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCertificates = () => {
    setLoading(true);
    listCertificates(_id).then((data) => {
      if (data.success === false) {
        console.log(data.message);
        setLoading(false);
      } else {
        setCertificates(data.certificates);
        setLoading(false);
      }
    });
  };

  const deleteCerti = async (id) => {
    await deleteCertificate(id);
    loadCertificates();
  };

  const showLoading = () => loading && <Spinner />;

  useEffect(() => {
    loadCertificates();
    showLoading();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: "#c0ffb3",
          minHeight: "8rem",
          padding: "2rem",
          marginBottom: "2rem",
        }}>
        <h1>Admin Dashboard</h1>
        <h5>{`Welcome, ${name}`}</h5>
      </div>

      <div style={{ margin: "2rem", padding: "1rem" }}>
        <Link to={`/admin/shops/${_id}/add/certificate`}>
          <button className="btn btn-primary">+ ADD CERTIFICATE</button>
        </Link>
      </div>

      <h2 className="text-center">MY CERTIFICATIONS</h2>
      {showLoading()}
      <div className="row">
        <div className="xs-col-12 col-sm-8">
          {certificates.map((certificate, index) => {
            return (
              <div
                key={index}
                className="mt-5"
                style={{ margin: "2rem", border: "0.5px solid" }}>
                <ul className="list-group mb-2">
                  <li className="list-group-item">
                    <strong>Certificate Name:</strong> {certificate.name}
                  </li>
                  <li className="list-group-item">
                    <strong>Certificate URL:</strong>{" "}
                    <a
                      href={certificate.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      {certificate.url}
                    </a>
                  </li>
                  <div className="row">
                    <div
                      className="xs-col-12 col-lg=6"
                      style={{ margin: "2rem" }}>
                      <Link
                        to={`/admin/shops/${_id}/certificate/${certificate._id}`}>
                        <button className="btn btn-primary">UPDATE</button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "1rem" }}
                        onClick={() => deleteCerti(certificate._id)}>
                        DELETE
                      </button>
                    </div>
                  </div>
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default AdminShopCertificates;
