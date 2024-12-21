import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { getShelfStats, db } from "../utils/db";


const ShelfStats = () => {
  const [dbChangeTrigger, setDbChangeTrigger] = useState(0);
  const [stats, loading, error] = useFetch(getShelfStats, [dbChangeTrigger]);

  const handleCreating = () => {
    setDbChangeTrigger((prev) => prev + 1);
  };

  const handleUpdating = () => {
    setDbChangeTrigger((prev) => prev + 1);
  };

  const handleDeleting = () => {
    setDbChangeTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    // Subscribe to Dexie hooks
    db.shelf.hook("creating", handleCreating);
    db.shelf.hook("updating", handleUpdating);
    db.shelf.hook("deleting", handleDeleting);

    return () => {
      db.shelf.hook('creating').unsubscribe(handleCreating);
      db.shelf.hook('updating').unsubscribe(handleUpdating);
      db.shelf.hook('deleting').unsubscribe(handleDeleting);
    };
  }, []);

  // Render loading or error states
  if (loading) return <p>Loading shelf stats...</p>;
  if (error) return <p>Error fetching stats: {error.message}</p>;

  // Define the stat keys
  const statKeys = [
    "Total Books",
    "Currently Reading",
    "To Be Read",
    "Did Not Finish",
    "Completed",
  ];

  return (
    <div className="font-header text-white flex gap-4">
      {statKeys.map((status) => {
        return (
          <div className="flex flex-col items-center justify-center bg-stat-gradient rounded-2xl p-4 w-60" key={status}>
            <p className="w-full font-medium text-lg text-center">{status}</p>
            <p>{stats[status]}</p>
            <p className="text-xs">Lorem Ipsum</p>
          </div>
        );
      })}
    </div>
  );
};

export default ShelfStats;
