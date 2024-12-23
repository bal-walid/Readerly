import { useRef, useEffect, useState } from "react";
import BookCard from "./BookCard";

const BookRow = ({ books, loading, error, onCardClick }) => {
  const [booksInRow, setBooksInRow] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    const calculateBooksInRow = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const bookCardWidth = 152 + 28; // Adjust this based on BookCard's dimensions
      const booksFit = Math.floor(containerWidth / bookCardWidth);

      setBooksInRow(booksFit);
    };

    calculateBooksInRow();
    window.addEventListener("resize", calculateBooksInRow);

    return () => {
      window.removeEventListener("resize", calculateBooksInRow);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex gap-7 max-sm:justify-center">
      {loading
        ? Array.from({ length: booksInRow }, (_, index) => (
            <BookCard key={`placeholder-${index}`} loading={true} />
          ))
        : !error && books.slice(0, booksInRow).map((book) => (
            <BookCard onClick={() => onCardClick(book)} key={book.id} book={book} />
          ))}
    </div>
  );
};

export default BookRow;
