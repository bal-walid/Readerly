import Dexie from "dexie";
const db = new Dexie("books");
db.version(1).stores({
  shelf: "id, status",
  wishlist: "id",
});

db.open();

db.shelf.hook("creating", (primKey, obj) => {
  if (!obj.status) {
    obj.status = "To Be Read";
  }
});

const statuses = [
  "Currently Reading",
  "To Be Read",
  "Did Not Finish",
  "Completed",
];

const addBookToShelf = async (book, authorBio, synopsis) => {
  return await db.shelf.add({ ...book, authorBio, synopsis });
};

const addBookToWishlist = async (book, authorBio, synopsis) => {
  return await db.wishlist.add({ ...book, authorBio, synopsis });
};

const getShelfStats = async () => {

  const stats = {};
  stats["Total Books"] = 0;

  for (const status of statuses) {
    stats[status] = await db.shelf.where("status").equals(status).count();
    stats["Total Books"] += stats[status];
  }

  return stats;
};

const getShelfBooks = async () => {
  return await db.shelf.toArray(); // Fetch all books from the books table
};

const findShelfBookById = async (id) => {
  const book = await (db.shelf.where('id').equals(id).first());
  return book;
};

const updateBookStatus = async (id, status) => {
  console.log(id, status);
  console.log(await db.shelf.update(id, {status}));
}

const addNote = async (id, note) => {
  try {
    const book = await db.shelf.get(id);
    if (!book) {
      throw new Error(`Book with ID ${id} not found.`);
    }
    if (!book.notes) {
      book.notes = [];
    }
    book.notes.push(note);
    await db.shelf.put(book);
    console.log(`Note added to book with ID ${id}.`);
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};


export { addBookToShelf, addBookToWishlist, getShelfStats, getShelfBooks, findShelfBookById, updateBookStatus, addNote };
