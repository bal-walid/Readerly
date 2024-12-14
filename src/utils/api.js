import formatText from "./formatText";

const API_BASE = `https://openlibrary.org/`;
const default_fields =
  "&fields=key,title,author_name,author_key,first_publish_year,cover_i";
const pagination_params = (limit, page) => `&limit=${limit}&page=${page}`;

const mapBooksResponse = (data) => {
  return data.docs.map((doc) => ({
    key: doc.key.replace("/works/", ""),
    title: doc.title,
    author: doc.author_name ? doc.author_name[0] : "Unknown Author",
    authorId: doc.author_key ? doc.author_key[0] : null,
    cover: doc.cover_i || null,
    publishDate: doc.first_publish_year || "Unknown Year",
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
  } catch {
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
  } catch {
    console.error("Error fetching data:", error);
    throw error;
  }
};
