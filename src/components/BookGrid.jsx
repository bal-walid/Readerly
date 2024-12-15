import BookCard from "./BookCard";

const BookGrid = ({ books, onCardClick }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] gap-6 pb-4 overflow-y-auto">
      {books.map((book) => (
        <BookCard
          onClick={() => onCardClick(book)}
          key={book.key}
          book={book}
        />
      ))}
    </div>
  );
};
export default BookGrid;