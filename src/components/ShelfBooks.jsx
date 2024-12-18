import { useNavigate, Outlet } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getShelfBooks } from "../utils/db";
import BookGrid from "./BookGrid";
import router from "../main";

const ShelfBooks = () => {
  const [books, loading, error] = useFetch(getShelfBooks);
  console.log(books);
  const openBookModal = (book) => {
    router.navigate(`./${book.key}`)
  }
  const closeBookModal = () => {
    router.navigate('/shelf');
  }
  if (loading) {
    return "Loading";
  }
  return (
    <>
      {books && <BookGrid onCardClick={openBookModal} books={books}/>}
      <Outlet context={{close: closeBookModal}}/>
    </>
  );
}
export default ShelfBooks;