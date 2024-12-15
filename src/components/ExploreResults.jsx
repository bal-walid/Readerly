import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import BookGrid from "./BookGrid";
import ExploreBookContainer from "./ExploreBookContainer";
import { fetchByCriteria } from "../utils/api";

const ExploreResults = () => {
  const [params] = useSearchParams();
  const criteria = params.get("criteria");
  const query = params.get("query");
  const [ data, loading, error ] = useFetch(fetchByCriteria, [criteria, query]);
  const [selectedBook, setSelectedBook] = useState(null);
  if (loading) {
    return "Loading...";
  }
  if (data) {
    return (
      <>
        {selectedBook && (
          <ExploreBookContainer
            close={(e) => e.target === e.currentTarget && setSelectedBook(null)}
            book={selectedBook}
          />
        )}
        <h1 className="font-header font-semibold text-3xl capitalize mt-14 mb-5">
          Search Results for: {query}
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] gap-6 pb-4 overflow-y-auto">
          <BookGrid books={data} onCardClick={(book) => setSelectedBook(book)}/>
        </div>
      </>
    );
  }
};
export default ExploreResults;
