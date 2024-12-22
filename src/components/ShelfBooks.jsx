import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { getShelfBooks } from "../utils/db";
import BookGrid from "./BookGrid";
import router from "../main";
import BookStatusDropdown from "./BookStatusDropdown";
import SearchInput from "./SearchInput";

const ShelfBooks = () => {
  const [books, setBooks] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Books");

  const [dbBooks, loading, error] = useFetch(getShelfBooks, [], (data) => {
    setBooks(data);
  });

  const getFilteredBooks = () => {
    if (!books) return [];
    
    let result = [...books];

    // Apply status filter
    if (statusFilter !== "All Books") {
      result = result.filter(book => book.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery && searchCriteria) {
      result = result.filter(book => 
        book[searchCriteria].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  };

  const openBookModal = (book) => {
    router.navigate(`./${book.id}`, { state: { book } });
  };

  const closeBookModal = () => {
    router.navigate("/shelf");
  };

  const handleSearch = (query, criteria) => {
    setSearchQuery(query);
    setSearchCriteria(criteria);
  };

  const handleFilter = (status) => {
    setStatusFilter(status);
  };

  return (
    <>
      <h2 className="secondary-header my-6 flex items-center gap-8 max-sm:gap-6 max-sm:flex-col">
        Your Books{" "}
        <div className="flex gap-4 w-3/5  max-sm:w-4/5 min-[850px]:ml-auto max-[850px]:flex-1 max-[850px]:items-center max-sm:flex-col ">
          <BookStatusDropdown
            className="max-sm:w-full text-base font-body flex items-center text-md p-2 bg-white rounded-full shadow-btn-shadow cursor-pointer"
            defaultValue="All Books"
            onStatusChange={handleFilter}
            filterDropdown={true}
          />
          <SearchInput inputFlex1={true} className="max-sm:w-full" handleSearch={handleSearch} instantSearch={true} />
        </div>
      </h2>
      {loading && "Loading"}
      {books && <BookGrid onCardClick={openBookModal} books={getFilteredBooks()} />}
      <Outlet context={{ close: closeBookModal, setBooks }} />
    </>
  );
};

export default ShelfBooks;