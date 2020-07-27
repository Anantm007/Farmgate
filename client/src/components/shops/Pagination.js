import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, pageNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <br />
      <br />
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            {number === pageNumber ? (
              <a
                href="# "
                onClick={() => paginate(number)}
                style={{ border: "2px solid blue" }}
                className="page-link">
                {number}&nbsp;
              </a>
            ) : (
              <a
                href="# "
                onClick={() => paginate(number)}
                className="page-link">
                {number}&nbsp;
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
