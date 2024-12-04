const BookCard = ({book}) => {
  const coverSrc = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
  return (
    <div className="border-2 border-black">
      <p>{book.title}</p>
      <p>{book.author_name}</p>
      <img src={coverSrc} alt="" />
      <p>{book.first_publish_year}</p>
    </div>
  );
}
export default BookCard;