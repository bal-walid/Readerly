import useFetch from "../hooks/useFetch";
import { getShelfStats } from "../utils/db";

const ShelfStats = () => {
  // Use the useFetch hook
  const [stats, loading, error] = useFetch(getShelfStats, []); // No params required

  // Render the stats or a loading message
  if (loading) return <p>Loading shelf stats...</p>;
  if (error) return <p>Error fetching stats: {error.message}</p>;

  return (
    <div>
      <ul>
        {Object.entries(stats).map(([status, count]) => (
          <li key={status}>
            <strong>{status}:</strong> {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShelfStats;