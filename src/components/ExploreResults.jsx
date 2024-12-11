import useFetch from "../hooks/useFetch";
import { fetchByCriteria } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import BookCard from "./BookCard";
import ExploreBookModal from "./ExploreBookModal";
import { useState } from "react";

const ExploreResults = () => {
  const [params] = useSearchParams();
  const criteria = params.get("criteria");
  const query = params.get("query");
  const { data, loading, error } = useFetch(fetchByCriteria, [criteria, query]);
  const [selectedBook, setSelectedBook] = useState(null);
  if (loading) {
    return "Loading...";
  }
  if (data) {
    return (
      <>
        {selectedBook && <ExploreBookModal close={() => setSelectedBook(null)} book={selectedBook}/>}
        <h1 className="font-header font-semibold text-3xl capitalize mt-14 mb-5">
          Search Results for: {query}
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] gap-6 pb-4 overflow-y-auto">
          {data.map((book) => (
            <BookCard
              onClick={() => setSelectedBook(book)}
              key={book.key}
              book={book}
            />
          ))}
        </div>
      </>
    );
  }
};
export default ExploreResults;
