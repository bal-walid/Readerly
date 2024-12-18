const BookCard = ({book, onClick}) => {
  const coverUrl = book.cover ? `https://covers.openlibrary.org/b/id/${book.cover}-M.jpg` : null;
  return (
    <div onClick={onClick} className="bg-white w-fit py-2 px-3 rounded-xl">
      <div className="w-32">
        <img className="border-[1px] border-silver w-full h-48 object-cover rounded-lg" src={coverUrl} alt="" />
        <p className="w-11/12 mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">{book.title}</p>
        <p className="text-sm text-text-secondary whitespace-nowrap overflow-hidden overflow-ellipsis"><span>{book.author}</span>, {book.publishDate}</p>
      </div>
    </div>
  );
}
export default BookCard;