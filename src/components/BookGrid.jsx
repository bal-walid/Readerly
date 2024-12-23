import { useEffect, useState } from "react";
import BookCard from "./BookCard";

const BookGrid = ({ books, onCardClick, loading = false }) => {
  const [placeholderCount, setPlaceholderCount] = useState(0);

  useEffect(() => {
    if (loading) {
      const calculatePlaceholders = () => {
        const containerWidth = window.innerWidth; // Assuming full-width container
        const viewportHeight = window.innerHeight / 2;
        const itemMinWidth = 170;
        const itemHeight = 260; // Adjust for gaps and padding

        const columns = Math.floor(containerWidth / itemMinWidth);
        const rows = Math.ceil(viewportHeight / itemHeight);

        setPlaceholderCount(columns * rows);
      };

      calculatePlaceholders();
      window.addEventListener("resize", calculatePlaceholders);

      return () => window.removeEventListener("resize", calculatePlaceholders);
    }
  }, [loading]);

  return (
    <div className="grid justify-items-center grid-cols-[repeat(auto-fill,_minmax(170px,_1fr))] gap-y-6 pb-4 overflow-y-auto">
      {loading
        ? Array.from({ length: placeholderCount }, (_, index) => (
            <BookCard key={`placeholder-${index}`} loading={true} />
          ))
        : books.map((book) => (
            <BookCard
              onClick={onCardClick ? () => onCardClick(book) : undefined}
              key={book.id}
              book={book}
            />
          ))}
    </div>
  );
};

export default BookGrid;
