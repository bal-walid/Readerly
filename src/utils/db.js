import Dexie from "dexie";
const db = new Dexie("books");
db.version(1).stores({
  shelf:
    "++id, status, key, title, publishDate, authorId, author, authorBio, synopsis, cover",
  wishlist:
    "++id, key, title, publishDate, authorId, author, authorBio, synopsis, cover",
});

db.open();

db.shelf.hook("creating", (primKey, obj) => {
  if (!obj.status) {
    obj.status = "Not Read";
  }
});

const addBookToShelf = async (book, authorBio, synopsis) => {
  return await db.shelf.add({ ...book, authorBio, synopsis });
};

const addBookToWishlist = async (book, authorBio, synopsis) => {
  return await db.wishlist.add({ ...book, authorBio, synopsis });
};

export { addBookToShelf, addBookToWishlist };
