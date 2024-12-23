import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { findWishListBookById, addBookToShelf, removeBookFromWishlist } from "../utils/db";
import ModalWrapper from "./ModalWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { getExternalLinks } from "../utils/api";
import router from "../main";
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
  const { close, setBooks } = useOutletContext();
  const links = book && getExternalLinks(book);

  const onRemoveFromWishlist = async () => {
    await removeBookFromWishlist(id);
    setBooks((books) => books.filter((book) => book.id !== id));
    router.navigate("..");
  };

  const onSendToShelf = async () => {
    await onRemoveFromWishlist();
    await addBookToShelf(book, book.bio, book.synopsis);
  };

  const coverUrl =
    book && book.cover
      ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
      : null;

  if (loading) {
    return "Loading...";
  }

  return (
    <ModalWrapper onClose={close}>
      <div
        className="max-lg:overflow-y-auto bg-white rounded-md p-6 w-[80%] h-[80%] max-w-[1000px] flex flex-col max-lg:w-[60%] max-lg:h-[95%] max-md:w-[80%] max-sm:w-full max-sm:h-full max-sm:py-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex max-lg:flex-col items-center">
          <h2 className="flex-1 text-main text-2xl font-header font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-lg:whitespace-normal max-lg:overflow-visible max-lg:text-clip max-lg:relative max-lg:w-full max-lg:text-center max-lg:flex max-lg:flex-col">
            <span className="max-lg:order-2">{book.title}</span>
            <button className="text-main lg:hidden max-lg:order-1 max-lg:my-4 text-left">
              <CloseIcon
                onClick={close}
                fontSize="large"
                sx={{
                  display: {
                    xs: "none",
                    lg: "inline",
                  },
                }}
              />
              <ArrowBackIcon
                onClick={close}
                fontSize="large"
                sx={{
                  display: {
                    xs: "inline",
                    lg: "none",
                  },
                }}
              />
            </button>
          </h2>
          <div className="flex ml-auto max-lg:ml-0 max-lg:flex-col gap-5 max-lg:gap-2 max-lg:my-3">
            <button
              onClick={onSendToShelf}
              className="btn text-green-500 flex items-center gap-2 text-sm"
            >
              <BookmarkAddOutlinedIcon fontSize="small" /> <span className="flex-1">Send To Shelf</span>
            </button>
            <button
              onClick={onRemoveFromWishlist}
              className="btn text-red-500 flex items-center gap-2 text-sm"
            >
              <StarIcon fontSize="small" /> <span className="flex-1">Remove From Wishlist</span>
            </button>
            <button className="text-main max-lg:hidden">
              <CloseIcon onClick={close} fontSize="large" />
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="pt-6 flex max-lg:flex-col max-lg:items-center gap-9 max-lg:gap-1 flex-1 min-h-0">
          <img
            className="w-80 aspect-[0.7/1] object-cover h-full border-[2px] border-silver rounded-md"
            src={coverUrl}
            alt="Book Cover"
          />
          <div className="h-full grid max-lg:block grid-rows-[auto_40%_minmax(0,1fr)]">
            {/* Ratings */}
            <p className="flex items-center max-lg:justify-center gap-3 max-[1100px]:text-sm max-[1100px]:gap-2">
              <StarIcon
                sx={{
                  fontSize: {
                    md: "24px",
                    lg: "35px",
                  },
                }}
                className={(book.rating ? "text-main" : "text-text-secondary") + " text-xs"}
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
                    __html: book.synopsis || "No Synopsis available.",
                  }}
                ></p>
              </div>
                          {/* Links */}
                          <div className="flex flex-col max-lg:pb-4">
                <h3 className="text-2xl mt-3 font-semibold max-[1200px]:mb-3">Links</h3>
                <div className="overflow-y-auto scrollbar pr-3 flex-1 flex flex-col gap-4 items-center">
                  {book.isbn && (
                    <>
                      <a
                        className="p-2 rounded-lg shadow-btn-shadow w-1/2 max-[1200px]:w-[70%] gap-2 flex items-center bg-[#313131] text-white font-header font-semibold"
                        href={links.amazon}
                      >
                        <img className="w-6 h-6" src={amazonIcon} alt="" /> Buy
                        on amazon
                      </a>
                      <a
                        className="p-2 rounded-lg shadow-btn-shadow w-1/2 max-[1200px]:w-[70%] gap-2 flex items-center bg-[#EBE8D3] text-[#938779] font-header font-semibold"
                        href={links.goodreads}
                      >
                        <img className="w-6 h-6" src={goodreadsIcon} alt="" />
                        Read reviews on goodreads
                      </a>
                    </>
                  )}
                  <a
                    className="p-2 rounded-lg shadow-btn-shadow w-1/2 max-[1200px]:w-[70%] gap-2 flex items-center bg-[#E2DCC5] text-[#5E92C3] font-header font-semibold"
                    href={links.openLibrary}
                  >
                    <img className="w-6 h-6" src={openLibraryIcon} alt="" />
                    See on OpenLibrary
                  </a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default WishListModal;
