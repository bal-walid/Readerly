import { useBookDetails } from "../hooks/useBooksDetails";
import { addBookToShelf, addBookToWishlist, removeBookFromShelf, removeBookFromWishlist } from "../utils/db";
import ExploreBookModal from "./ExploreBookModal";

const ExploreBookContainer = ({ book, close }) => {
  const { bio, bioLoading, synopsis, synopsisLoading, inCollections, inCollectionsLoading } = useBookDetails(book);

  const handleAddToShelf = (book, bio, synopsis) => {
    addBookToShelf(book, bio, synopsis);
  };

  const handleAddToWishlist = (book, bio, synopsis) => {
    addBookToWishlist(book, bio, synopsis);
  };

  const handleRemoveFromShelf = (book) => {
    removeBookFromShelf(book);
  }

  const handleRemoveFromWishlist = (book) => {
    removeBookFromWishlist(book);
  }
  return (
    <ExploreBookModal
      book={book}
      close={close}
      bio={bio}
      bioLoading={bioLoading}
      synopsis={synopsis}
      synopsisLoading={synopsisLoading}
      inCollections={inCollections}
      inCollectionsLoading={inCollectionsLoading}
      onAddToShelf={handleAddToShelf}
      onAddToWishlist={handleAddToWishlist}
      onRemoveFromShelf={handleRemoveFromShelf}
      onRemoveFromWishlist={handleRemoveFromWishlist}
    />
  );
};

export default ExploreBookContainer;