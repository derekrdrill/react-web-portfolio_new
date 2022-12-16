import { useEffect, useState } from 'react';

export const useFetch = (url, options) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(
    /* istanbul ignore next */
    () => {
      const fetchData = async () => {
        try {
          const response = await fetch(url, options);
          const data = await response.json();

          setData(data);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      };

      fetchData();
    },
    [options, url],
  );

  return { data, loading, error };
};
