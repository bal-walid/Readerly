const BookCard = ({book}) => {
  return (
    <div className="bg-white w-fit py-2 px-3 rounded-xl">
      <div className="w-32">
        <img className="border-[1px] border-silver w-full h-48 object-cover rounded-lg" src={book.cover} alt="" />
        <p className="w-11/12 mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">{book.title}</p>
        <p className="text-sm text-text-secondary whitespace-nowrap overflow-hidden overflow-ellipsis"><span>{book.author}</span>, {book.publishDate}</p>
      </div>
    </div>
  );
}
export default BookCard;