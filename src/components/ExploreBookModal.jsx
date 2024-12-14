import ModalWrapper from "./ModalWrapper";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";

const ExploreBookModal = ({
  book,
  close,
  bio,
  bioLoading,
  synopsis,
  synopsisLoading,
  onAddToShelf,
  onAddToWishlist,
}) => {
  const coverUrl = book.cover
    ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
    : null;

  return (
    <ModalWrapper onClose={close}>
      {/* Header */}
      <div className="flex items-center">
        <h2 className="text-main text-2xl font-header font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {book.title}
        </h2>
        <div className="flex ml-auto gap-5">
          <button
            onClick={() => onAddToShelf(book, bio, synopsis)}
            className="btn text-green-500 flex items-center gap-2 text-sm"
          >
            <BookmarkAddOutlinedIcon fontSize="small" /> Add To Shelf
          </button>
          <button
            onClick={() => onAddToWishlist(book, bio, synopsis)}
            className="btn text-[#DBC332] flex items-center gap-2 text-sm"
          >
            <StarBorderOutlinedIcon fontSize="small" /> Add To Wishlist
          </button>
          <button className="text-main">
            <CloseIcon onClick={close} fontSize="large" />
          </button>
        </div>
      </div>
      <div className="text-text-secondary">
        {book.author}, {book.publishDate}
      </div>

      {/* Main */}
      <div className="pt-2 flex gap-9 flex-1 min-h-0">
        <img
          className="w-80 object-cover h-full border-[2px] border-silver rounded-md"
          src={coverUrl}
          alt="Book Cover"
        />
        <div className="h-full grid grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Ratings */}
          <p className="flex items-center gap-3">
            <StarIcon fontSize="large" className="text-main" />
            <span>
              {book.rating} <span className="font-semibold text-lg">/ 5</span>
            </span>
            Average Rating on OpenLibrary
            <span className="text-text-secondary italic text-sm">({book.ratingCount} reviews)</span>
          </p>

          {/* Synopsis */}
          <div className="flex flex-col">
            <h3 className="text-2xl mt-3">Synopsis</h3>
            <p
              className="book-info break-anywhere overflow-y-auto scrollbar pr-3"
              dangerouslySetInnerHTML={{
                __html: synopsisLoading
                  ? "Loading synopsis..."
                  : synopsis || "No Synopsis Found.",
              }}
            ></p>
          </div>

          {/* Author Bio */}
          <div className="flex flex-col">
            <h3 className="text-2xl mt-3">About Author</h3>
            <p
              className="book-info break-anywhere overflow-y-auto scrollbar pr-3"
              dangerouslySetInnerHTML={{
                __html: bioLoading
                  ? "Loading author bio..."
                  : bio || "Author data not found.",
              }}
            ></p>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ExploreBookModal;
