import useFetch from "../hooks/useFetch";
import { fetchByCriteria } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import BookCard from "./BookCard";

const ExploreResults = () => {
  const [params] = useSearchParams();
  const criteria = params.get("criteria");
  const query = params.get("query");
  console.log(criteria, query);
  const { data, loading, error } = useFetch(fetchByCriteria, [criteria, query]);
  console.log(data, loading, error);
  if (data) {
    return (
      <div>
        {data.docs.map((book) => 
          <BookCard book={book} />
        )}
      </div>
    );
  }
};
export default ExploreResults;
