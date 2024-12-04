const API_BASE = `https://openlibrary.org/search.json?`
const default_fields= "&fields=key,title,author_name,first_publish_year,cover_i"
const pagination_params = (limit, page) => `&limit=${limit}&page=${page}` 


const mapBooksResponse = (data) => {
  return data.docs.map((doc) => ({
    key: doc.key,
    title: doc.title,
    author: doc.author_name ? doc.author_name.join(', ') : 'Unknown Author',
    cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
    publishDate: doc.first_publish_year || 'Unknown Year',
  }));
};

export const fetchByCriteria = async (criteria, query, limit = 15, page = 1) => {
  const url = `${API_BASE}${criteria}=${query}${default_fields}${pagination_params(limit, page)}`; // Fix: replaced `title` with `query`

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return mapBooksResponse(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};



