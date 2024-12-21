import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { fetchAuthorBio, fetchSynopsis } from "../utils/api";
import { bookInCollections } from "../utils/db";

export const useBookDetails = (book) => {
  const [inCollections, setInCollections] = useState(null);
  const [bio, bioLoading, bioError] = useFetch(fetchAuthorBio, [book.authorId]);
  const [synopsis, synopsisLoading, synopsisError] = useFetch(fetchSynopsis, [book.id]);
  const [inCollectionsDb, inCollectionsLoading, inCollectionsError] = useFetch(bookInCollections, [book.id], (result) => setInCollections(result));
  return { bio, bioLoading, bioError, synopsis, synopsisLoading, synopsisError, inCollections, setInCollections, inCollectionsLoading, inCollectionsError };
};
