const BookCard = ({book}) => {
  return (
    <div className="bg-white w-fit py-2 px-3 rounded-xl">
      <div className="w-32">
        <img className="w-full object-cover rounded-lg" src={book.cover} alt="" />
        <p className="mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis w-full">{book.title}</p>
        <p className="text-sm text-text-secondary">{book.author}, {book.publishDate}</p>
      </div>
    </div>
  );
}
export default BookCard;