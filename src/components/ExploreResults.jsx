  import useFetch from "../hooks/useFetch";
  import { fetchByCriteria } from "../utils/api";
  import { useSearchParams } from "react-router-dom";
  import BookCard from "./BookCard";

  const ExploreResults = () => {
    const [params] = useSearchParams();
    const criteria = params.get("criteria");
    const query = params.get("query");
    const { data, loading, error } = useFetch(fetchByCriteria, [criteria, query]);
    if (loading) {
      return "Loading..."
    }
    if (data) {
      return (
        <>
          <h1 className="font-header font-semibold text-3xl capitalize mt-14 mb-5">Search Results for: {query}</h1>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] gap-6 pb-4 overflow-y-auto">
            {data.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        </>
      );
    }
  };
  export default ExploreResults;
