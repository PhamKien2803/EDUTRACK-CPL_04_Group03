import React, { useState } from 'react';

const Items: React.FC = () => {
  // State to track the selected option from the dropdown
  const [activityFilter, setActivityFilter] = useState('All Activities');

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample items array for demonstration
  const items = Array.from({ length: 30 }, (_, index) => `Item ${index + 1}`); // Total 30 items
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Pagination functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToPrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const goToLastPage = () => setCurrentPage(totalPages);

  // Calculate items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="items">
        {/* {currentItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))} */}
      </div>

      <div className="pagination">
        <div className="pagination-buttons">
          <button onClick={goToFirstPage} disabled={currentPage === 1}>First</button>
          <button onClick={goToPrevPage} disabled={currentPage === 1}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
          <button onClick={goToLastPage} disabled={currentPage === totalPages}>Last</button>
        </div>
      </div>
    </div>
  );
}

export default Items;
