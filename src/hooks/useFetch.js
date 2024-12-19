// useFetch.js
import { useState, useEffect } from "react";

const useFetch = (fetchFunction, params = [], callback = null, shouldFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(shouldFetch);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction(...params); // Fetch data
        setData(result);
        if (callback) {
          callback(result); // Call the callback function if provided
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // JSON.stringify ensures params trigger re-fetch only when the values change
  }, [JSON.stringify(params)]);

  return [data, loading, error];
};

export default useFetch;
