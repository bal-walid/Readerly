import "../assets/styles/loading.css";

const BookCard = ({ book, onClick, loading = false }) => {
  const coverUrl =
    book && book.cover
      ? `https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`
      : null;
  if (loading) {
    return (
      <div className="bg-white w-fit py-2 px-3 rounded-xl">
        <div className="w-32 max-[390px]:w-40">
          <div className="loading border-[1px] border-transparent w-full h-48 max-[390px]:h-56 object-cover rounded-lg">
            {" "}
          </div>
          <div className="loading rounded-lg">
            <p className="w-11/12 mt-2 invisible">placeholder</p>
            <p className="text-sm invisible">placeholder</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div onClick={onClick} className="bg-white w-fit py-2 px-3 rounded-xl">
      <div className="w-32 max-[390px]:w-40">
        {coverUrl ? (
          <img
            className="loading border-[1px] border-silver w-full h-48 max-[390px]:h-56 object-cover rounded-lg"
            src={coverUrl}
            alt="Book cover"
            onLoad={(e) => e.target.classList.remove("loading")}
          />
        ) : (
          <div className="border-[1px] border-silver w-full h-48 max-[390px]:h-56  rounded-lg flex items-center justify-center text-center text-gray-500 px-4">
            No cover found
          </div>
        )}
        <p className="w-11/12 mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {book.title}
        </p>
        <p className="text-sm text-text-secondary whitespace-nowrap overflow-hidden overflow-ellipsis">
          <span>{book.author}</span>, {book.publishDate}
        </p>
      </div>
    </div>
  );
};
export default BookCard;
