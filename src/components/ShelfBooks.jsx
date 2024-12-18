import { useNavigate, useParams, Outlet } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getShelfBooks } from "../utils/db";
import BookGrid from "./BookGrid";
import ShelfModal from "./ShelfModal";

const ShelfBooks = () => {
  const [books, loading, error] = useFetch(getShelfBooks);
  const { id } = useParams();
  const navigate = useNavigate();
  const openBookModal = (book) => {
    navigate(`./${book.key}`)
  }
  const closeBookModal = () => {
    navigate('/shelf');
  }
  if (loading) {
    return "Loading";
  }
  return (
    <>
      {books && <BookGrid onCardClick={openBookModal} books={books}/>}
      { id && <Outlet context={{close: closeBookModal}}/>}
    </>
  );
}
export default ShelfBooks;