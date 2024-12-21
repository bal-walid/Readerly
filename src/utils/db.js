import Dexie from "dexie";
export const db = new Dexie("books");
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

const removeBookFromShelf = async (bookId) => {
  return await db.shelf.delete(bookId);
};

const removeBookFromWishlist = async (bookId) => {
  return await db.wishlist.delete(bookId);
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

const getWishlistBooks = async () => {
  return await db.wishlist.toArray(); // Fetch all books from the books table
};

const findShelfBookById = async (id) => {
  const book = await (db.shelf.where('id').equals(id).first());
  return book;
};

const findWishListBookById = async (id) => {
  const book = await (db.wishlist.where('id').equals(id).first());
  return book;
};

const updateBookStatus = async (id, status) => {
  console.log(id, status);
  console.log(await db.shelf.update(id, {status}));
}

const addNote = async (id, noteContent) => {
  try {
    const book = await db.shelf.get(id);
    if (!book) {
      throw new Error(`Book with ID ${id} not found.`);
    }

    if (!book.notes) {
      book.notes = [];
    }

    const newNoteId = book.notes.length > 0 
      ? Math.max(...book.notes.map(note => note.id)) + 1 
      : 1;

    const newNote = {
      id: newNoteId,
      ...noteContent,
    };

    book.notes.push(newNote);
    await db.shelf.put(book);

    console.log(`Note added to book with ID ${id}.`);
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

export const editNote = async (bookId, noteId, updatedNote) => {
  try {
    const book = await db.shelf.get(bookId);
    if (!book) {
      throw new Error(`Book with ID ${bookId} not found.`);
    }
    if (!book.notes || book.notes.length === 0) {
      throw new Error(`No notes found for book with ID ${bookId}.`);
    }
    const noteIndex = book.notes.findIndex(note => note.id == noteId);
    if (noteIndex === -1) {
      throw new Error(`Note with ID ${noteId} not found.`);
    }
    book.notes[noteIndex] = { ...book.notes[noteIndex], ...updatedNote };
    await db.shelf.put(book);
    console.log(`Note with ID ${noteId} updated for book with ID ${bookId}.`);
  } catch (error) {
    console.error("Error editing note:", error);
    throw error;
  }
};


const getNoteById = async (bookId, noteId) => {
  console.log(bookId, noteId);
  try {
    const book = await db.shelf.get(bookId);
    if (!book) {
      throw new Error(`Book with ID ${bookId} not found.`);
    }
    if (!book.notes || book.notes.length === 0) {
      throw new Error(`No notes found for book with ID ${bookId}.`);
    }
    const note = book.notes.find(note => note.id == noteId);
    if (!note) {
      throw new Error(`Note with ID ${noteId} not found in book with ID ${bookId}.`);
    }

    console.log(`Note with ID ${noteId} retrieved from book with ID ${bookId}:`, note);
    return {...note, bookTitle: book.title};
  } catch (error) {
    console.error("Error retrieving note:", error);
    throw error;
  }
};

const bookInCollections = async (bookId) => {
  try {
    const [shelfBook, wishlistBook] = await Promise.all([
      db.shelf.get(bookId),
      db.wishlist.get(bookId),
    ]);

    return {
      inShelf: !!shelfBook, // true if the book exists in the shelf
      inWishlist: !!wishlistBook, // true if the book exists in the wishlist
    };
  } catch (error) {
    console.error("Error checking if book exists in collections:", error);
    return {
      shelf: false,
      wishlist: false,
    };
  }
};



const deleteNote = async (bookId, noteId) => {
  try {
    const book = await db.shelf.get(bookId);
    if (!book) {
      throw new Error(`Book with ID ${bookId} not found.`);
    }
    if (!book.notes || book.notes.length === 0) {
      throw new Error(`No notes found for book with ID ${bookId}.`);
    }

    const updatedNotes = book.notes.filter(note => note.id !== noteId);
    if (updatedNotes.length === book.notes.length) {
      throw new Error(`Note with ID ${noteId} not found.`);
    }
    book.notes = updatedNotes;
    await db.shelf.put(book);
    console.log(`Note with ID ${noteId} deleted from book with ID ${bookId}.`);
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};


export { addBookToShelf, addBookToWishlist, getWishlistBooks, getShelfStats, getShelfBooks, findWishListBookById, findShelfBookById, updateBookStatus, addNote, getNoteById, deleteNote, bookInCollections, removeBookFromShelf, removeBookFromWishlist };
