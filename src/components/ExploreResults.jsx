import { useRef, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import BookGrid from "./BookGrid";
import ExploreBookContainer from "./ExploreBookContainer";
import { fetchByCriteria } from "../utils/api";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const ExploreResults = () => {
  const [params] = useSearchParams();
  const criteria = params.get("criteria");
  const query = params.get("query");
  const [selectedBook, setSelectedBook] = useState(null);
  const {data, loading, page, error, hasMore, observerRef} = useInfiniteScroll(fetchByCriteria, [criteria, query, 15], 15);
  return (
    <>
      {selectedBook && (
        <ExploreBookContainer
          close={(e) => e.target === e.currentTarget && setSelectedBook(null)}
          book={selectedBook}
        />
      )}
      <h1 className="primary-header capitalize mb-5">
        Search Results for: {query}
      </h1>

      <BookGrid
        loading={loading}
        loadingMore={page > 1}
        books={data}
        onCardClick={(book) => setSelectedBook(book)}
      />
      <div className="h-2" ref={observerRef}>
        {" "}
      </div>
    </>
  );
};
export default ExploreResults;
