import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { fetchAuthorBio, fetchSynopsis } from "../utils/api";
import useFetch from "../hooks/useFetch";

const ExploreBookModal = ({ book, close }) => {
  const [bio, bioLoading, bioError] = useFetch(fetchAuthorBio, [book.authorId]);
  const [synopsis, synopsisLoading, synopsisError] = useFetch(fetchSynopsis, [
    book.key,
  ]);
  const coverUrl = book.cover
    ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
    : null;
  return (
    <div
      onClick={close}
      className="absolute z-10 bg-black bg-opacity-50 top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white rounded-md p-6 w-[80%] h-[80%] max-w-[1000px] flex flex-col">
        {/* Header */}
        <div className="flex items-center">
          <h2 className="text-main text-2xl font-header font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {book.title}
          </h2>
          <div className="flex ml-auto gap-5">
            <button className="btn text-green-500 flex items-center gap-2 text-sm">
              <BookmarkAddOutlinedIcon fontSize="small" /> Add To Shelf
            </button>
            <button className="btn text-[#DBC332] flex items-center gap-2 text-sm">
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
        {/* min-h-0 is necessary because flex children expand to fit content by default! */}
        <div className="pt-2 flex gap-9 flex-1 min-h-0">
          <img
            className="w-80 object-cover h-full  border-[2px] border-silver rounded-md"
            src={coverUrl}
            alt=""
          />
          <div className="h-full grid grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)]">
            <p className="flex items-center gap-3">
              <StarIcon fontSize="large" className="text-main" />
              <span>
                4.24 <span className="font-semibold text-lg">/ 5</span>{" "}
              </span>
              Average Rating on OpenLibrary
            </p>
            <div className="flex flex-col">
              <h3 className="text-2xl mt-3">Synopsis</h3>
              <p
                className="book-info break-anywhere overflow-y-auto scrollbar pr-3"
                dangerouslySetInnerHTML={{
                  __html: synopsisLoading ? "Loading synopsis" : (synopsis || "No Synopsis Found."),
                }}
              ></p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl mt-3">About Author</h3>
              <p
                className="book-info break-anywhere overflow-y-auto scrollbar pr-3"
                dangerouslySetInnerHTML={{
                  __html: bioLoading ? "Loading bio" : (bio || "Author data not found."),
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExploreBookModal;
