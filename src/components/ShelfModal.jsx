import { useLocation, useOutletContext, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { findShelfBookById } from "../utils/db";
import ModalWrapper from "./ModalWrapper";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import BookStatusDropdown from "./BookStatusDropdown";

const ShelfModal = () => {
  const location = useLocation();
  const { id } = useParams();
  const notes = [
    { title: "Key Takeaways" },
    { title: "Chapter 10 Thoughts" },
    { title: "First Impressions" },
    { title: "Final Reflections" },
    { title: "Plot Twists" },
    { title: "Character Development" },
    { title: "Favorite Quotes" },
    { title: "Themes and Motifs" },
    { title: "Writing Style" },
    { title: "Ending Thoughts" },
  ];
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
      <div onClick={(e) => e.stopPropagation()} className="bg-white h-full w-full flex items-center justify-center">
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
            <div className="flex ml-auto gap-5">
              <BookStatusDropdown/>
            </div>
          </div>
          {/* Main */}
          <div className="pt-6 flex gap-9 flex-1 min-h-0">
            <img
              className="w-80 object-cover h-full border-[2px] border-silver rounded-md"
              src={coverUrl}
              alt="Book Cover"
            />
            <div className="h-full grid grid-rows-[30%_minmax(0,1fr)]">
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
                <div className="flex flex-col pt-2 gap-3 overflow-y-auto scrollbar pr-3">
                  {notes.map((note, index) => (
                    <div key={index} className="bg-white flex items-center justify-between rounded-lg gap-2 py-2 px-4">
                      <span className="font-medium text-xl">{note.title}</span>
                      <ArrowForwardIcon />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
export default ShelfModal;
