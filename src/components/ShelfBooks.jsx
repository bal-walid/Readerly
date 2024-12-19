import { useNavigate, Outlet } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getShelfBooks } from "../utils/db";
import BookGrid from "./BookGrid";
import router from "../main";
import BookStatusDropdown from "./BookStatusDropdown";
import SearchInput from "./SearchInput";

const ShelfBooks = () => {
  const [books, loading, error] = useFetch(getShelfBooks);
  console.log(books);
  const openBookModal = (book) => {
    router.navigate(`./${book.id}`, { state: { book } });
  };
  const closeBookModal = () => {
    router.navigate("/shelf");
  };

  return (
    <>
      <h2 className="secondary-header my-6 flex items-center gap-8">
        Your Books{" "}
        <div className="flex gap-4 w-3/5">
          <BookStatusDropdown
            className={
              "flex items-center text-md p-2  bg-white rounded-full shadow-btn-shadow cursor-pointer"
            }
            defaultValue={"Completed"}
            onStatusChange={() => console.log("a")}
            filterDropdown={true}
          />
          <SearchInput />
        </div>
      </h2>
      {loading && "Loading"}
      {books && <BookGrid onCardClick={openBookModal} books={books} />}
      <Outlet context={{ close: closeBookModal }} />
    </>
  );
};
export default ShelfBooks;
