import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <br/><br/>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item ml-4'>
            <a href="# " onClick={() => paginate(number)} className='page-link'>
              {number}&nbsp;
            </a>
          </li> 
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;