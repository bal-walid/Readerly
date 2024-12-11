import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

const ExploreBookModal = ({ book, close }) => {
  console.log(book);
  return (
    <div className="absolute z-10 bg-black bg-opacity-50 top-0 left-0 w-full h-full">
      <div className="bg-white p-6">
        {/* Modal Header */}
        <div className="flex items-center">
          <h2 className="text-main text-2xl font-header font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {book.title}
          </h2>
          <div className="flex ml-auto gap-3">
            <button className="btn text-green-500 flex items-center gap-2 text-sm">
              <BookmarkAddOutlinedIcon fontSize="small" /> Add To Shelf
            </button>
            <button className="btn text-[#DBC332] flex items-center gap-2 text-sm">
              <StarBorderOutlinedIcon fontSize="small" /> Add To Wishlist
            </button>
            <button className="text-main" onClick={close}>
              <CloseIcon fontSize="large" />
            </button>
          </div>
        </div>
        <div className="text-text-secondary">{book.author}, {book.publishDate}</div>
        {/*  */}
      </div>
    </div>
  );
};
export default ExploreBookModal;
