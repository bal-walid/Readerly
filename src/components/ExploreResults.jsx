import useFetch from "../hooks/useFetch";
import { fetchByCriteria } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import BookCard from "./BookCard";

const ExploreResults = () => {
  const [params] = useSearchParams();
  const criteria = params.get("criteria");
  const query = params.get("query");
  const { data, loading, error } = useFetch(fetchByCriteria, [criteria, query]);
  if (data) {
    return (
      <div>
        {data.map((book) => 
          <BookCard key={book.key} book={book} />
        )}
      </div>
    );
  }
};
export default ExploreResults;
