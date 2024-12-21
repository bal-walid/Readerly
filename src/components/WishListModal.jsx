import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { findWishListBookById } from "../utils/db";
import ModalWrapper from "./ModalWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import { getExternalLinks } from "../utils/api";
import goodreadsIcon from "../assets/images/goodreads.svg";
import amazonIcon from "../assets/images/amazon.svg";
import openLibraryIcon from "../assets/images/openLibrary.png";

const WishListModal = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [dbBook, loading, error] = useFetch(
    findWishListBookById,
    [id],
    (book) => {
      setBook(book);
    }
  );
  const { close } = useOutletContext();
  const links = book && getExternalLinks(book);
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
          className="bg-white rounded-md p-6 w-[80%] h-[80%] max-w-[1000px] flex flex-col"
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
            <div className="h-full grid grid-rows-[auto_40%_minmax(0,1fr)] flex-1">
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
                <h3 className="text-2xl mt-3 font-semibold">Synopsis</h3>
                <p
                  className="book-info break-anywhere overflow-y-auto scrollbar pr-3"
                  dangerouslySetInnerHTML={{
                    __html: book.synopsis || "No Synopsis available.",
                  }}
                ></p>
              </div>
              {/* Links */}
              <div className="flex flex-col">
                <h3 className="text-2xl mt-3 font-semibold">Links</h3>
                <div className="overflow-y-auto scrollbar pr-3 flex-1 flex flex-col gap-4 items-center">
                  {book.isbn && (
                    <>
                      <a className="p-2 rounded-lg shadow-btn-shadow w-1/2 gap-2 flex items-center bg-[#313131] text-white font-header font-semibold" href={links.amazon}><img className="w-6 h-6" src={amazonIcon} alt="" /> Buy on amazon</a>
                      <a className="p-2 rounded-lg shadow-btn-shadow w-1/2 gap-2 flex items-center bg-[#EBE8D3] text-[#938779] font-header font-semibold" href={links.goodreads}><img className="w-6 h-6" src={goodreadsIcon} alt="" />Read reviews on goodreads</a>
                    </>
                  )}
                  <a className="p-2 rounded-lg shadow-btn-shadow w-1/2 gap-2 flex items-center bg-[#E2DCC5] text-[#5E92C3] font-header font-semibold" href={links.openLibrary}><img className="w-6 h-6" src={openLibraryIcon} alt="" />See on OpenLibrary</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};
export default WishListModal;
