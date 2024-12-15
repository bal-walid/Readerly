import useFetch from "../hooks/useFetch";
import { getShelfStats } from "../utils/db";

const ShelfStats = () => {
  // Use the useFetch hook
  const [stats, loading, error] = useFetch(getShelfStats, []); // No params required
  const statKeys = [
    "Total Books",
    "Currently Reading",
    "To Be Read",
    "Did Not Finish",
    "Completed",
  ];
  // Render the stats or a loading message
  if (loading) return <p>Loading shelf stats...</p>;
  if (error) return <p>Error fetching stats: {error.message}</p>;

  return (
    <div className="font-header text-white flex gap-4">
      {statKeys.map((status) => {
        return (
          <div className="flex flex-col items-center justify-center bg-stat-gradient rounded-2xl p-4 w-60" key={status}>
            <p className="w-full font-medium text-lg text-center">{status}</p>
            <p >{stats[status]}</p>
            <p className="text-xs">Lorem Ipsum</p>
          </div>
        );
      })}
    </div>
  );
};

export default ShelfStats;
