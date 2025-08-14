import React, { useEffect, useState } from "react";

const PaginationExample = () => {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch dummy data
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / perPage);

  // Get data for current page
  const startIndex = (currentPage - 1) * perPage;
  const currentData = data.slice(startIndex, startIndex + perPage);

  // Get page numbers (show only 5 at a time)
  const getPageNumbers = () => {
    const maxPageNumbers = 5;
    let start =
      Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + 1;

    let pageNumbers = [];
    let limit = maxPageNumbers;

    // If remaining pages are less than maxPageNumbers
    if (totalPages - start + 1 < maxPageNumbers) {
      limit = totalPages - start + 1;
    }

    for (let i = 0; i < limit; i++) {
      pageNumbers.push(start + i);
    }

    return pageNumbers;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pagination Example</h2>

      {/* Per page dropdown */}
      <div style={{ marginBottom: "10px" }}>
        <label>Per Page: </label>
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div style={{ marginTop: "15px", display: "flex", gap: "5px" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            style={{
              fontWeight: currentPage === page ? "bold" : "normal",
              backgroundColor: currentPage === page ? "#ddd" : "white",
            }}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationExample;
