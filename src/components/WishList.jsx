import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { getWishlistBooks } from "../utils/db";
import BookGrid from "./BookGrid";
import router from "../main";
import { Outlet } from "react-router-dom";

const WishList = () => {
  const [books, setBooks] = useState();
  const [dbBooks, loading, error] = useFetch(getWishlistBooks, [], (data) => {
    setBooks(data);
  });
  const openBookModal = (book) => {
    router.navigate(`./${book.id}`);
  };
  const closeBookModal = () => {
    router.navigate("/wishlist");
  };
  if (loading) {
    return "Loading...";
  }
  return (
    <>
      <h1 className="primary-header mb-6">Your Wishlist</h1>
      <BookGrid onCardClick={openBookModal} books={books} />
      <Outlet context={{ close: closeBookModal }} />
    </>
  );
};
export default WishList;
