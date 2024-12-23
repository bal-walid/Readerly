import formatText from "./formatText";
import { getUniqueAuthors } from "./db";

const API_BASE = `https://openlibrary.org/`;
const default_fields =
  "&fields=key,title,author_name,author_key,first_publish_year,cover_i,ratings_average,ratings_count,isbn";
const pagination_params = (limit, page) => `&limit=${limit}&page=${page}`;

const mapBooksResponse = (data) => {
  return data.docs.map((doc) => ({
    id: doc.key.replace("/works/", ""),
    title: doc.title,
    author: doc.author_name ? doc.author_name[0] : "Unknown Author",
    authorId: doc.author_key ? doc.author_key[0] : null,
    cover: doc.cover_i || null,
    publishDate: doc.first_publish_year || "Unknown Year",
    rating: doc.ratings_average ? Number(doc.ratings_average).toFixed(2) : null,
    ratingCount: doc.ratings_count || null,
    isbn: doc.isbn ? doc.isbn[0] : null
  }));
};

export const fetchByCriteria = async (
  criteria,
  query,
  limit = 15,
  page = 1
) => {
  const url = `${API_BASE}search.json?${criteria}=${query}${default_fields}${pagination_params(
    limit,
    page
  )}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch books: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return mapBooksResponse(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchAuthorBio = async (authorId) => {
  const url = `${API_BASE}authors/${authorId}.json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch author: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    let bio = data.bio;
    if (bio == null) {
      return null;
    }
    if (typeof (bio == "object") && bio.value) {
      bio = bio.value;
    }
    return formatText(bio);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchSynopsis = async (workId) => {
  const url = `${API_BASE}works/${workId}.json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch synopsis: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    let synopsis = data.description;
    if (synopsis == null) {
      return null;
    }
    if (typeof (synopsis == "object") && synopsis.value) {
      synopsis = synopsis.value;
    }
    return formatText(synopsis);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getExternalLinks = (book) => {
  const openLibraryLink = `${API_BASE}works/${book.id}`;
  if (!book.isbn) {
    return {openLibrary: openLibraryLink};
  }

  const amazonLink = `https://www.amazon.com/s?k=${book.isbn}`;
  const goodreadsLink = `https://www.goodreads.com/search?q=${book.isbn}&search_type=books`;
  

  return {
    amazon: amazonLink,
    goodreads: goodreadsLink,
    openLibrary: openLibraryLink,
  };
};

export const getTrendingBooks = async () => {
  const url = `${API_BASE}trending/monthly.json`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch books: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const titles = data.works.map((doc) => doc.title);
    const queryString = titles.map((title) => `"${title}"`).join(" OR ");
    const secondaryUrl = `${API_BASE}search.json?q=title:(${queryString})${default_fields}${pagination_params(
      30,
      1
    )}`;

    const secondaryResponse = await fetch(secondaryUrl);
    const secondaryData = await secondaryResponse.json();
    return mapBooksResponse(secondaryData);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}



export const fetchBooksByAuthors = async (limit = 8, page = 1) => {
  try {
    const authors = await getUniqueAuthors();
    if (!authors || authors.length === 0) {
      throw new Error("No authors found in the database.");
    }
    const queryString = authors.map((author) => `"${author}"`).join(" OR ");
    const url = `${API_BASE}search.json?q=author:(${queryString})${default_fields}${pagination_params(
      limit,
      page
    )}`;

    // Fetch books
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch books: ${response.status} ${response.statusText}`
      );
    }

    // Process response
    const data = await response.json();
    return mapBooksResponse(data);
  } catch (error) {
    console.error("Error fetching books by authors:", error);
    throw error;
  }
};
