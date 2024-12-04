import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [query, setQuery] = useState(''); 
  const [criteria, setCriteria] = useState('title'); 
  const navigate = useNavigate();

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
  };

  const handleSearchClick = () => {
    if (query) {
      // Navigates to /explore with the search params (criteria and query)
      navigate(`/explore?criteria=${criteria}&query=${query}`);
    }
  };

  return (
    <div className="search-input-container">
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search..."
        className="search-input"
      />
      <select
        value={criteria}
        onChange={handleCriteriaChange}
        className="criteria-dropdown"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="subject">Subject</option>
      </select>
      <button
        onClick={handleSearchClick}
        className="search-button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
