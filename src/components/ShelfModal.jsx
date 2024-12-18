import { useLocation, useOutletContext, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { findShelfBookById } from "../utils/db";
import ModalWrapper from "./ModalWrapper";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
      <div className="bg-white h-full w-full flex items-center justify-center">
        <div
          className="bg-primary rounded-md p-6 w-[90%] h-[90%] max-w-[1200px] flex flex-col"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <div className="flex items-center">
            <h2 className="flex items-center gap-2 text-main text-2xl font-header font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              <ArrowBackIcon
                className="cursor-pointer"
                onClick={close}
                fontSize="large"
              />
              {book.title}
            </h2>
            <div className="flex ml-auto gap-5"></div>
          </div>
          {/* Main */}
          <div className="pt-6 flex gap-9 flex-1 min-h-0">
            <img
              className="w-80 object-cover h-full border-[2px] border-silver rounded-md"
              src={coverUrl}
              alt="Book Cover"
            />
            <div className="h-full grid grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
              {/* Synopsis */}
              <div className="flex flex-col">
                <h3 className="text-2xl mt-3 font-semibold">Synopsis</h3>
                <p
                  className="book-info break-anywhere overflow-y-auto scrollbar pr-3"
                  dangerouslySetInnerHTML={{
                    __html: book.synopsis,
                  }}
                ></p>
              </div>
              {/* Notes */}
              <div className="flex flex-col">
                <h3 className="text-2xl mt-3 font-semibold">Your Notes</h3>
                <div className="overflow-y-auto scrollbar pr-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
export default ShelfModal;
