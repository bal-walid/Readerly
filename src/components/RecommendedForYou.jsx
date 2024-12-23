import { useState } from "react";
import { fetchBooksByAuthors } from "../utils/api";
import useFetch from "../hooks/useFetch";
import BookRow from "./BookRow";
import ExploreBookContainer from "./ExploreBookContainer";

const RecommendedForYou = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, loading, error] = useFetch(fetchBooksByAuthors);
  if (error) {
    if (error.message === "No authors found in the database.") {
      return (
        <div>
          <p>Add more books to your shelf to see recommendations!</p>
        </div>
      );
    }
    return (
      <div>
        <p>Error fetching books: {error.message}. Please refresh the page</p>
      </div>
    );
  }
  return (
    <>
      {selectedBook && (
        <ExploreBookContainer
          close={(e) => e.target === e.currentTarget && setSelectedBook(null)}
          book={selectedBook}
        />
      )}

      <BookRow
        books={books}
        loading={loading}
        error={error}
        onCardClick={(book) => setSelectedBook(book)}
      />
    </>
  );
};

export default RecommendedForYou;
