import React, { useState } from 'react';

const Items: React.FC = () => {
  // State to track the selected option from the dropdown
  // const [activityFilter, setActivityFilter] = useState('All Activities');

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
  console.log(currentItems)

  return (
    <div>
      <div className="items">
        {/* Display items
        {currentItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))} */}
      </div>

      {/* Pagination controls */}
      <div className="pagination" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={goToFirstPage} disabled={currentPage === 1} style={buttonStyle}>
          First
        </button>
        <button onClick={goToPrevPage} disabled={currentPage === 1} style={buttonStyle}>
          Prev
        </button>
        <span style={{ margin: '0 10px', alignSelf: 'center' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} style={buttonStyle}>
          Next
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages} style={buttonStyle}>
          Last
        </button>
      </div>
    </div>
  );
}

// Style for pagination buttons
const buttonStyle = {
  padding: '8px 12px',
  margin: '0 5px',
  border: '1px solid #007BFF',
  backgroundColor: 'white',
  color: '#007BFF',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

export default Items;
