import { useRef, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import BookGrid from "./BookGrid";
import ExploreBookContainer from "./ExploreBookContainer";
import { fetchByCriteria, getTrendingBooks } from "../utils/api";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const ExploreResults = () => {
  const [params] = useSearchParams();
  const criteria = params.get("criteria");
  const query = params.get("query");
  const [selectedBook, setSelectedBook] = useState(null);
  const fetchFunction = query && criteria ? fetchByCriteria : getTrendingBooks;
  const limitPerPage = query && criteria ? 15 : 31;
  const { data, loading, page, error, hasMore, observerRef } =
    useInfiniteScroll(
      fetchFunction,
      [criteria, query, limitPerPage],
      limitPerPage
    );
  return (
    <>
      {selectedBook && (
        <ExploreBookContainer
          close={(e) => e.target === e.currentTarget && setSelectedBook(null)}
          book={selectedBook}
        />
      )}
      <h1 className="primary-header capitalize mb-5">
        {query && criteria ? `Search Results for: ${query}` : "Trending Books"}
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
