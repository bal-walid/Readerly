import Dexie from "dexie";
const db = new Dexie("books");
db.version(1).stores({
  shelf: "key, status",
  wishlist: "key",
});

db.open();

db.shelf.hook("creating", (primKey, obj) => {
  if (!obj.status) {
    obj.status = "To Be Read";
  }
});

const addBookToShelf = async (book, authorBio, synopsis) => {
  return await db.shelf.add({ ...book, authorBio, synopsis });
};

const addBookToWishlist = async (book, authorBio, synopsis) => {
  return await db.wishlist.add({ ...book, authorBio, synopsis });
};

const getShelfStats = async () => {
  const statuses = [
    "Currently Reading",
    "To Be Read",
    "Did Not Finish",
    "Completed",
  ];
  const stats = {};

  for (const status of statuses) {
    stats[status] = await db.shelf.where("status").equals(status).count();
  }

  return stats;
};

const getShelfBooks = async () => {
  return await db.shelf.toArray(); // Fetch all books from the books table
};

export { addBookToShelf, addBookToWishlist, getShelfStats, getShelfBooks };
