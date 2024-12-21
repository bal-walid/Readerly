import { useBookDetails } from "../hooks/useBooksDetails";
import {
  addBookToShelf,
  addBookToWishlist,
  removeBookFromShelf,
  removeBookFromWishlist,
} from "../utils/db";
import ExploreBookModal from "./ExploreBookModal";

const ExploreBookContainer = ({ book, close }) => {
  const {
    bio,
    bioLoading,
    synopsis,
    synopsisLoading,
    inCollections,
    setInCollections,
    inCollectionsLoading,
  } = useBookDetails(book);

  const handleAddToShelf = (book, bio, synopsis) => {
    addBookToShelf(book, bio, synopsis);
    setInCollections((inCollections) => {
      return { ...inCollections, inShelf: true };
    });
  };
  
  const handleAddToWishlist = (book, bio, synopsis) => {
    addBookToWishlist(book, bio, synopsis);
    setInCollections((inCollections) => {
      return { ...inCollections, inWishlist: true };
    });
  };
  
  const handleRemoveFromShelf = (book) => {
    removeBookFromShelf(book);
    setInCollections((inCollections) => {
      return { ...inCollections, inShelf: false };
    });
  };
  
  const handleRemoveFromWishlist = (book) => {
    removeBookFromWishlist(book);
    setInCollections((inCollections) => {
      return { ...inCollections, inWishlist: false };
    });
  };
  
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
