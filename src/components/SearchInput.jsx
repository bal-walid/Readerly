import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import Chevron from '@mui/icons-material/KeyboardArrowDown';

const SearchInput = ({handleSearch}) => {
  const [query, setQuery] = useState("");
  const [criteria, setCriteria] = useState("title");
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
  };

  return (
    <div className="flex text-[#4D4D4D]">
        <select
          value={criteria}
          onChange={handleCriteriaChange}
          className="text-[#4D4D4D] bg-[#F8F5F5] rounded-l-full text-center outline-none py-2 px-3"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="subject">Subject</option>
        </select>

      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        onKeyUp={(e) => e.key === 'Enter' && handleSearch(query, criteria)}
        placeholder="Search..."
        className="py-2 px-3 outline-none"
      />

      <button onClick={() => handleSearch(query, criteria)} className="text-main flex-items-center py-2 px-3 bg-white rounded-r-full outline-none">
        <SearchIcon sx={{strokeWidth: 0}} fontSize="small"/>
      </button>
    </div>
  );
};

export default SearchInput;
