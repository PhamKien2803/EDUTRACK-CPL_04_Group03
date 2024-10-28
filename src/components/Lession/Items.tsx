import React, { useState } from 'react';
const Items: React.FC = () => {
  // State to track the selected option from the dropdown
  const [activityFilter, setActivityFilter] = useState('All Activities');

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 6; // total items
  const itemsPerPage = 6; // items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);



  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="pagination">
      {/* <span>{totalItems} of {totalItems} items - {totalPages} pages</span> */}
      <div className="pagination-buttons">
        <button onClick={goToFirstPage} disabled={currentPage === 1}>First</button>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>Prev</button>
        <span>{currentPage}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>Last</button>
      </div>
    </div>
  );
}

export default Items;