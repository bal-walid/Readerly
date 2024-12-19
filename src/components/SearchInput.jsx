import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Chevron from "@mui/icons-material/KeyboardArrowDown";

const SearchInput = ({ handleSearch, instantSearch = false }) => {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("query") || "");
  const [criteria, setCriteria] = useState(params.get("criteria") || "title");
  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (instantSearch) {
      handleSearch(newQuery, criteria); // Call handleSearch directly if instantSearch is true
    }
  };

  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
    if (instantSearch) {
      handleSearch(query, event.target.value);
    }
  };

  const handleKeyUp = (e) => {
    if (!instantSearch && e.key === "Enter") {
      handleSearch(query, criteria);
    }
  };

  const handleButtonClick = () => {
    if (!instantSearch) {
      handleSearch(query, criteria);
    }
  };

  return (
    <div className="flex text-[#4D4D4D] min-w-0">
      <select
        value={criteria}
        onChange={handleCriteriaChange}
        className="text-[#4D4D4D] bg-[#F8F5F5] rounded-l-full text-center outline-none py-2 px-3"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        {!instantSearch && <option value="subject">Subject</option>}
      </select>

      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        onKeyUp={handleKeyUp}
        placeholder="Search..."
        className="py-2 px-3 outline-none min-w-0"
      />

      <button
        onClick={handleButtonClick}
        className="text-main flex-items-center py-2 px-3 bg-white rounded-r-full outline-none"
      >
        <SearchIcon sx={{ strokeWidth: 0 }} fontSize="small" />
      </button>
    </div>
  );
};

export default SearchInput;
