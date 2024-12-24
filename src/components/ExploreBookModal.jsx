import ModalWrapper from "./ModalWrapper";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../assets/styles/loading.css";

const ExploreBookModal = ({
  book,
  close,
  bio,
  bioError,
  bioLoading,
  synopsis,
  synopsisLoading,
  synopsisError,
  inCollections,
  onAddToShelf,
  onAddToWishlist,
  onRemoveFromShelf,
  onRemoveFromWishlist,
}) => {
  const coverUrl = book.cover
    ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
    : null;

  return (
    <ModalWrapper onClose={close}>
      <div
        className="max-lg:overflow-y-auto bg-white rounded-md p-6 w-[80%] h-[80%] max-w-[1000px] flex flex-col max-lg:w-[60%] max-lg:h-[95%] max-md:w-[80%] max-sm:w-full max-sm:h-full max-sm:py-0"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex max-lg:flex-col items-center">
          <h2 className="flex-1 text-main text-2xl font-header font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-lg:whitespace-normal max-lg:overflow-visible max-lg:text-clip max-lg:relative max-lg:w-full max-lg:text-center max-lg:flex max-lg:flex-col">
            <span className="max-lg:order-2">{book.title}</span>
            <button className="text-main lg:hidden max-lg:order-1 max-lg:my-4  text-left">
              <CloseIcon
                onClick={close}
                fontSize="large"
                sx={{
                  display: {
                    xs: "none", // Hidden on extra-small screens
                    lg: "inline", // Visible on screens 1024px and up (lg and up)
                  },
                }}
              />
              <ArrowBackIcon
                onClick={close}
                fontSize="large"
                sx={{
                  display: {
                    xs: "inline", // Visible on extra-small screens
                    lg: "none", // Hidden on screens 1024px and up (lg and up)
                  },
                }}
              />
            </button>
          </h2>
          <div className="text-text-secondary lg:hidden">
            {book.author}, {book.publishDate}
          </div>
          <div className="flex ml-auto max-lg:ml-0 max-lg:flex-col gap-5 max-lg:gap-2 max-lg:my-3">
            {inCollections && (
              <>
                {!inCollections.inShelf ? (
                  <button
                    onClick={() => onAddToShelf(book, bio, synopsis)}
                    className="btn text-green-500 flex items-center gap-2 text-sm"
                  >
                    <BookmarkAddOutlinedIcon fontSize="small" />{" "}
                    <span className="flex-1">Add To Shelf</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onRemoveFromShelf(book.id)}
                    className="btn text-red-500 flex items-center gap-2 text-sm"
                  >
                    <BookmarkRemoveIcon fontSize="small" />{" "}
                    <span className="flex-1">Remove From Shelf</span>
                  </button>
                )}
                {!inCollections.inWishlist ? (
                  <button
                    onClick={() => onAddToWishlist(book, bio, synopsis)}
                    className="btn text-[#DBC332] flex items-center gap-2 text-sm"
                  >
                    <StarBorderOutlinedIcon fontSize="small" />{" "}
                    <span className="flex-1">Add To Wishlist</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onRemoveFromWishlist(book.id)}
                    className="btn text-red-500 flex items-center gap-2 text-sm"
                  >
                    <StarIcon fontSize="small" />{" "}
                    <span className="flex-1">Remove From Wishlist</span>
                  </button>
                )}
              </>
            )}

            <button className="text-main max-lg:hidden">
              <CloseIcon onClick={close} fontSize="large" />
            </button>
          </div>
        </div>
        <div className="text-text-secondary max-lg:hidden">
          {book.author}, {book.publishDate}
        </div>

        {/* Main */}
        <div className="pt-2 flex max-lg:flex-col max-lg:items-center gap-9 max-lg:gap-1 flex-1 min-h-0">
          {coverUrl ? (
            <img
              className="loading aspect-[0.7/1] w-80 object-cover h-full border-[2px] border-silver rounded-md"
              src={coverUrl}
              alt="Book Cover"
              onLoad={(e) => e.target.classList.remove("loading")}
            />
          ) : (
            <div className="aspect-[0.7/1] w-80 h-full border-[2px] border-silver rounded-md flex items-center justify-center text-center text-gray-500">
              No cover found
            </div>
          )}

          <div className="h-full grid max-lg:block grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)]">
            {/* Ratings */}
            <p className="flex max-[450px]:flex-col max-[450px]:gap-0 max-[1100px]:gap-2 gap-3 items-center max-lg:justify-center max-[1100px]:text-sm ">
              <StarIcon
                sx={{
                  fontSize: {
                    md: "24px", // For medium screens
                    lg: "35px", // For large screens
                  },
                }}
                className={
                  (book.rating ? "text-main" : "text-text-secondary") +
                  " text-xs"
                }
              />
              {book.rating ? (
                <>
                  <span>
                    {book.rating} <span className="font-semibold">/ 5</span>
                  </span>
                  Average Rating on OpenLibrary
                  <span className="text-secondary text-sm italic">
                    ({book.ratingCount} reviews)
                  </span>
                </>
              ) : (
                <>No Reviews</>
              )}
            </p>

            {/* Synopsis */}
            <div className="flex flex-col">
              <h3 className="text-2xl mt-3 font-semibold">Synopsis</h3>
              <p
                className="book-info break-anywhere overflow-y-auto scrollbar pr-3"
                dangerouslySetInnerHTML={{
                  __html: synopsisLoading
                    ? "Loading synopsis..."
                    : synopsisError
                    ? `Error loading synopsis. Please try again.`
                    : synopsis || "No Synopsis Found.",
                }}
              ></p>
            </div>

            {/* Author Bio */}
            <div className="flex flex-col max-lg:pb-4">
              <h3 className="text-2xl mt-3 font-semibold">About Author</h3>
              <p
                className="book-info break-anywhere overflow-y-auto scrollbar pr-3"
                dangerouslySetInnerHTML={{
                  __html: bioLoading
                    ? "Loading author bio..."
                    : bioError
                    ? `Error loading bio. Please try again.`
                    : bio || "Author data not found.",
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ExploreBookModal;
