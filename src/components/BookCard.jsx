const BookCard = ({book}) => {
  return (
    <div className="border-2 border-black">
      <p>{book.title}</p>
      <p>{book.author}</p>
      <img src={book.cover} alt="" />
      <p>{book.publishDate}</p>
    </div>
  );
}
export default BookCard;