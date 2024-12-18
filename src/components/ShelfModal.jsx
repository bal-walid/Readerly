import { useLocation, useOutletContext, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { findShelfBookById } from "../utils/db";
import ModalWrapper from "./ModalWrapper";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";

const ShelfModal = () => {
  const location = useLocation();
  const { id } = useParams();
  const { book: stateBook } = location.state || {};
  const [dbBook, loading, error] = useFetch(
    () => findShelfBookById(id),
    [id],
    !stateBook
  );
  const book = stateBook || dbBook;
  const { close } = useOutletContext();
  const coverUrl =
    book && book.cover
      ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
      : null;
  if (loading) {
    return "Loading...";
  }
  return (
    <ModalWrapper onClose={close}>
      {/* Header */}
      <div
        className="bg-white rounded-md p-6 w-[80%] h-[80%] max-w-[1000px] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex items-center">
          <h2 className="text-main text-2xl font-header font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {book.title}
          </h2>
          <div className="flex ml-auto gap-5">
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
              <StarIcon
                fontSize="large"
                className={book.rating ? "text-main" : "text-text-secondary"}
              />
              {book.rating ? (
                <>
                  <span>
                    {book.rating}{" "}
                    <span className="font-semibold text-lg">/ 5</span>
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
              <h3 className="text-2xl mt-3">Synopsis</h3>
              <p
                className="book-info break-anywhere overflow-y-auto scrollbar pr-3"
                dangerouslySetInnerHTML={{
                  __html: book.synopsis,
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
export default ShelfModal;
