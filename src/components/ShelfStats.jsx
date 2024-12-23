import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { getShelfStats, db } from "../utils/db";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';  

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


  if (error) return <p>Error fetching stats: {error.message}</p>;

  // Define the stat keys
  const statKeys = [
    "Total Books",
    "Currently Reading",
    "To Be Read",
    "Did Not Finish",
    "Completed",
  ];

  const splideOptions = {
    type: 'slide',
    perPage: 5,
    perMove: 1,
    gap: '1rem',
    pagination: false,
    arrows: false,
    breakpoints: {
      1340: {
        arrows: true,
        perPage: 4,
      },
      1100: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      640: {
        perPage: 1,
        width: "70%",
      },
      500 : {
        perPage: 1,
        width: "100%"
      }
    }
  };

  return (
    <div className="font-header text-white w-full min-[500px]:max-sm:flex min-[500px]:max-sm:justify-center">
      <Splide options={splideOptions} className="p-4">
        {statKeys.map((status) => (
          <SplideSlide key={status}>
            <div className="flex flex-col items-center justify-center bg-main bg-opacity-90 rounded-2xl p-4 h-full">
              <p className={`w-full font-semibold text-xl text-center `}><span className={`inline-block ${loading ? "spinner" : ""}`}>{loading ? "" : stats[status]}</span></p>
              <p>{status}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default ShelfStats;