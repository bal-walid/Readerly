// useFetch.js
import { useState, useEffect } from "react";

const useFetch = (fetchFunction, params = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction(...params); // Spread params if necessary
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // JSON.stringify is used because the straight up array was failing the referrential check and triggering
  // re-renders
  }, [JSON.stringify(params)]);

  return [ data, loading, error ];
};

export default useFetch;
