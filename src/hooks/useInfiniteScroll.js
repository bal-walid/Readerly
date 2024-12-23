import { useRef, useEffect, useState } from "react";

const useInfiniteScroll = (fetchFunction, params, perPageLimit = 15) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const observerRef = useRef();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPage = async (page) => {
    try {
      setLoading(true);
      const response = await fetchFunction(...params, page);
      if (response.length < perPageLimit) {
        setHasMore(false);
      } 
        setData((prevData) => [...prevData, ...response]);

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setHasMore(true);
        setPage(1);
        const response = await fetchFunction(...params, 1);
        if (response.length < perPageLimit) {
          setHasMore(false);
        }
          setData(response);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(params)]);

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchPage(page + 1);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { root: null, rootMargin: "100px", threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loading, hasMore]);

  return { data, loading, page, error, hasMore, observerRef };
};

export default useInfiniteScroll;
