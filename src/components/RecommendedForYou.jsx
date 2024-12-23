import { useState } from "react";
import { fetchBooksByAuthors } from "../utils/api";
import useFetch from "../hooks/useFetch";
import BookRow from "./BookRow";
import ExploreBookContainer from "./ExploreBookContainer"; // Import the modal container

const RecommendedForYou = () => {
  const [selectedBook, setSelectedBook] = useState(null); // State to track selected book
  const [books, loading, error] = useFetch(fetchBooksByAuthors); // Fetch books by authors

  return (
    <>
      {/* Modal rendering logic */}
      {selectedBook && (
        <ExploreBookContainer
          close={(e) => e.target === e.currentTarget && setSelectedBook(null)} // Close modal on background click
          book={selectedBook} // Pass the selected book to the modal
        />
      )}

      {/* Book Row with books and click handler */}
      <BookRow
        books={books}
        loading={loading}
        onCardClick={(book) => setSelectedBook(book)} // Set selected book on card click
      />
    </>
  );
};

export default RecommendedForYou;
