import { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8088/api/v1';

/**
 *
 * @param {string} url
 * @param {object} option
 * @returns {object} { data, loading, error }
 */
function useFetch(url, option) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMount = true;
    const callApi = async () => {
      setLoading(true);
      await fetch(BASE_URL + url, option)
        .then(result => {
          if (result.ok) return result.json();
          throw new Exception('Not found!');
        })
        .then(response => {
          if (isMount) setData(response.data);
        })
        .catch(err => setError(err))
        .finally(setLoading(false));
    };

    callApi();

    return () => {
      isMount = false;
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
