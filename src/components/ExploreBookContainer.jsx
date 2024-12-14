import { useBookDetails } from "../hooks/useBooksDetails";
import { addBookToShelf, addBookToWishlist } from "../utils/db";
import ExploreBookModal from "./ExploreBookModal";

const ExploreBookContainer = ({ book, close }) => {
  const { bio, bioLoading, synopsis, synopsisLoading } = useBookDetails(book);

  const handleAddToShelf = (book, bio, synopsis) => {
    addBookToShelf(book, bio, synopsis);
  };

  const handleAddToWishlist = (book, bio, synopsis) => {
    addBookToWishlist(book, bio, synopsis);
  };

  return (
    <ExploreBookModal
      book={book}
      close={close}
      bio={bio}
      bioLoading={bioLoading}
      synopsis={synopsis}
      synopsisLoading={synopsisLoading}
      onAddToShelf={handleAddToShelf}
      onAddToWishlist={handleAddToWishlist}
    />
  );
};

export default ExploreBookContainer;