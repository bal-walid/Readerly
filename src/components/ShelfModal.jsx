import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {
  findShelfBookById,
  updateBookStatus,
  deleteNote,
  removeBookFromShelf,
} from "../utils/db";
import ModalWrapper from "./ModalWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookStatusDropdown from "./BookStatusDropdown";
import router from "../main";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import "../assets/styles/loading.css";

const ShelfModal = () => {
  const { close, setBooks } = useOutletContext();
  const { id } = useParams();
  const [notes, setNotes] = useState(null);
  const onDelete = async (noteId) => {
    await deleteNote(id, noteId);
    setNotes((notes) => notes.filter((note) => note.id !== noteId));
  };
  const onRemoveFromShelf = async () => {
    await removeBookFromShelf(id);
    setBooks((books) => books.filter((book) => book.id != id));
    router.navigate("/shelf");
  };
  const [book, setBook] = useState(null);
  const [dbBook, loading, error] = useFetch(findShelfBookById, [id], (book) => {
    setBook(book);
    setNotes(book.notes || null);
  });
  const coverUrl =
    book && book.cover
      ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
      : null;
  if (loading) {
    return "Loading...";
  }
  return (
    <>
      <ModalWrapper onClose={close}>
        {/* Header */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white h-full w-full flex items-center justify-center"
        >
          <div
            className="max-lg:overflow-y-auto bg-primary rounded-md p-6 w-[90%] h-[90%] max-w-[1200px] flex flex-col max-lg:w-[60%] max-lg:h-[95%] max-md:w-[80%] max-sm:w-full max-sm:h-full max-sm:py-0"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="flex items-center max-lg:flex-col">
              <h2 className="flex-1 text-main text-2xl font-header font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-lg:whitespace-normal max-lg:overflow-visible max-lg:text-clip max-lg:relative max-lg:w-full max-lg:text-center max-lg:flex max-lg:flex-col">
                <ArrowBackIcon
                  className="cursor-pointer max-lg:my-4"
                  onClick={close}
                  fontSize="large"
                />
                {book.title}
              </h2>
              <div className="flex ml-auto max-lg:ml-0 max-lg:flex-col gap-5 max-lg:gap-2 max-lg:my-3">
                <BookStatusDropdown
                  className={
                    "flex items-center space-x-2 bg-white p-2 rounded-full shadow-btn-shadow cursor-pointer text-sm font-body btn"
                  }
                  defaultValue={book.status}
                  onStatusChange={(status) => {
                    updateBookStatus(book.id, status),
                      setBook({ ...book, status });
                    setBooks((books) =>
                      books.map((book) => {
                        if (book.id == id) {
                          return { ...book, status };
                        } else {
                          return book;
                        }
                      })
                    );
                  }}
                />
                <button
                  onClick={onRemoveFromShelf}
                  className="btn text-red-500 flex items-center gap-2 text-sm"
                >
                  <BookmarkRemoveIcon fontSize="small" />{" "}
                  <span className="flex-1">Remove From Shelf</span>
                </button>
              </div>
            </div>
            {/* Main */}
            <div className="pt-6 flex max-lg:flex-col max-lg:items-center gap-9 max-lg:gap-1 flex-1 min-h-0">
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

              <div className="h-full grid max-lg:block grid-rows-[30%_minmax(0,1fr)] flex-1">
                {/* Synopsis */}
                <div className="flex flex-col">
                  <h3 className="text-2xl mt-3 font-semibold">Synopsis</h3>
                  <p
                    className="book-info break-anywhere overflow-y-auto scrollbar pr-3"
                    dangerouslySetInnerHTML={{
                      __html: book.synopsis || "No Synopsis available.",
                    }}
                  ></p>
                </div>
                {/* Notes */}
                <div className="flex flex-col max-lg:pb-4">
                  <h3 className="text-2xl mt-3 font-semibold flex items-center pr-7">
                    Your Notes{" "}
                    <AddCircleOutlineIcon
                      onClick={() => router.navigate("./notes/add")}
                      fontSize="large"
                      className="ml-auto"
                    />{" "}
                  </h3>
                  <div className="flex flex-col pt-2 gap-3 overflow-y-auto scrollbar pr-3">
                    {notes &&
                      notes.map((note) => (
                        <div
                          onClick={() => router.navigate(`./notes/${note.id}`)}
                          key={note.id}
                          className="bg-white cursor-pointer hover:bg-slate-200 hover:bg-opacity-50 flex items-center justify-between rounded-lg gap-2 py-2 px-4"
                        >
                          <span className="font-medium text-xl">
                            {note.title}
                          </span>
                          <div className="flex gap-2">
                            <DeleteIcon
                              onClick={(e) => {
                                onDelete(note.id);
                                e.stopPropagation();
                              }}
                              color="error"
                            />
                            <ArrowForwardIcon className="hover:text-main" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};
export default ShelfModal;
