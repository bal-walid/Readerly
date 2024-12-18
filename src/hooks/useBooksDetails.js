import useFetch from "../hooks/useFetch";
import { fetchAuthorBio, fetchSynopsis } from "../utils/api";

export const useBookDetails = (book) => {
  const [bio, bioLoading, bioError] = useFetch(fetchAuthorBio, [book.authorId]);
  const [synopsis, synopsisLoading, synopsisError] = useFetch(fetchSynopsis, [book.id]);
  return { bio, bioLoading, bioError, synopsis, synopsisLoading, synopsisError };
};
