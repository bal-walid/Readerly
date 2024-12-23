import { useRef, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useLocation, useSearchParams } from "react-router-dom";
import BookGrid from "./BookGrid";
import ExploreBookContainer from "./ExploreBookContainer";
import { fetchByCriteria, fetchBooksByAuthors, getTrendingBooks } from "../utils/api";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const ExploreResults = () => {
  const {pathname} = useLocation();
  const recommended = pathname === "/recommended";
  const [params] = useSearchParams();
  const criteria = params.get("criteria");
  const query = params.get("query");
  const [selectedBook, setSelectedBook] = useState(null);
  const fetchFunction = recommended ?  fetchBooksByAuthors : (query && criteria ? fetchByCriteria : getTrendingBooks);
  const limitPerPage = recommended ? 15 : (query && criteria ? 15 : 31);
  const { data, loading, page, error, hasMore, observerRef } =
    useInfiniteScroll(
      fetchFunction,
      recommended ? [limitPerPage] : [criteria, query, limitPerPage],
      limitPerPage
    );
    return (
  <>
    <h1 className="primary-header capitalize mb-5">
      {recommended
        ? "Recommended For You"
        : query && criteria
        ? `Search Results for: ${query}`
        : "Trending Books"}
    </h1>

    {error ? (
      <div>
        <p>Error fetching books: {error.message}. Please refresh the page</p>
      </div>
    ) : (
      <>
        {/* Modal rendering logic */}
        {selectedBook && (
          <ExploreBookContainer
            close={(e) => e.target === e.currentTarget && setSelectedBook(null)}
            book={selectedBook}
          />
        )}

        {/* Book grid rendering logic */}
        <BookGrid
          loading={loading}
          loadingMore={page > 1}
          books={data}
          onCardClick={(book) => setSelectedBook(book)}
        />

        <div className="h-2" ref={observerRef}></div>
      </>
    )}
  </>
);

};
export default ExploreResults;
