import useFetch from "../hooks/useFetch";
import { getShelfBooks } from "../utils/db";
import BookGrid from "./BookGrid";

const ShelfBooks = () => {
  const [books, loading, error] = useFetch(getShelfBooks);
  if (loading) {
    return "Loading";
  }
  if (books) {
    return <BookGrid books={books}/>;
  }
}
export default ShelfBooks;