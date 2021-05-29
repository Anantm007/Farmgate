import React, { useState } from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, pageNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(1);

  const handleClick = (number) => {
    setCurrentNumber(number);

    paginate(number);
    paginate(number);
  };

  const iconClick = (flag) => {
    const totalPages = totalItems / itemsPerPage;

    if (flag && currentNumber < totalPages) {
      setCurrentNumber(currentNumber + 1);
      paginate(currentNumber + 1);
    } else if (!flag && currentNumber > 1) {
      setCurrentNumber(currentNumber - 1);
      paginate(currentNumber - 1);
    }
  };
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <br />
      <br />
      <ul className="pagination">
        <i
          className="fas fa-angle-left"
          style={{ margin: " 1rem", cursor: "pointer" }}
          onClick={() => iconClick(false)}
        />
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            {number === pageNumber ? (
              <a
                href="# "
                onClick={() => handleClick(number)}
                style={{ border: "2px solid blue" }}
                className="page-link">
                {number}&nbsp;
              </a>
            ) : (
              <a
                href="# "
                onClick={() => handleClick(number)}
                className="page-link">
                {number}&nbsp;
              </a>
            )}
          </li>
        ))}
        <i
          className="fas fa-angle-right"
          style={{ margin: " 1rem", cursor: "pointer" }}
          onClick={() => iconClick(true)}
        />
      </ul>
    </nav>
  );
};

export default Pagination;
