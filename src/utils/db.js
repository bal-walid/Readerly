import Dexie from "dexie";
const db = new Dexie("books");
db.version(1).stores({
  books:
    "++id, key, title, publishDate, authorId, author, authorBio, synopsis, cover",
  wishlist:
    "++id, key, title, publishDate, authorId, author, authorBio, synopsis, cover",
});

db.open();

const addBookToShelf = async (book, authorBio, synopsis) => {
  return await db.books.add({ ...book, authorBio, synopsis });
};

const addBookToWishlist = async (book, authorBio, synopsis) => {
  return await db.wishlist.add({ ...book, authorBio, synopsis });
};

export { addBookToShelf, addBookToWishlist };
