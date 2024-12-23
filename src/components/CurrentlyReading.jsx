import useFetch from "../hooks/useFetch";
import { getShelfBooksByStatus } from "../utils/db";
import BookRow from "./BookRow";
import router from "../main";

const CurrentlyReading = () => {
  const [books, loading, error] = useFetch(getShelfBooksByStatus, ["Currently Reading"]);
  const onCardClick = (book) => {
    console.log(book);
    router.navigate(`/shelf/${book.id}`);
  }

  if (error) {
    return <div>Error loading books.</div>;
  }

  if (books && books.length === 0) {
    return <div>Books you marked currently reading will appear here.</div>
  }

  return (
    <BookRow onCardClick={onCardClick} books={books} loading={loading} />
  );
};

export default CurrentlyReading;
