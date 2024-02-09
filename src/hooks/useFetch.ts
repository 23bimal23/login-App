import { useState, useEffect } from "react";

type URLType = {
  url: string
}
type UserData = {
  id:number
  name: string
  email: string
  password: string
  role:string
}

type FetchResult = {
  data: UserData| null;
  isPending: boolean;
  error: string | null;
}

const useFetch = (url: URLType): FetchResult => {
  const [data, setData] = useState<UserData| null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    setTimeout(() => {
      fetch(url.url, { signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch data for that resource");
          }
          return res.json();
        })
        .then((responseData) => {
          setData(responseData);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => abortController.abort();
  }, [url.url]);

  return {
    data,
    isPending,
    error,
  };
};

export default useFetch;
