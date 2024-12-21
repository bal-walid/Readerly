import useFetch from "../hooks/useFetch";
import { fetchAuthorBio, fetchSynopsis } from "../utils/api";
import { bookInCollections } from "../utils/db";

export const useBookDetails = (book) => {
  const [bio, bioLoading, bioError] = useFetch(fetchAuthorBio, [book.authorId]);
  const [synopsis, synopsisLoading, synopsisError] = useFetch(fetchSynopsis, [book.id]);
  const [inCollections, inCollectionsLoading, inCollectionsError] = useFetch(bookInCollections, [book.id]);
  return { bio, bioLoading, bioError, synopsis, synopsisLoading, synopsisError, inCollections, inCollectionsLoading, inCollectionsError };
};
