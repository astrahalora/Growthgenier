import { useState, useEffect } from "react";

export function useFetch() {
    const [data, setData] = useState();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setData(undefined);
        setIsError(false);
        setIsLoading(true);

        fetch("http://127.0.0.1:5000/api/growth")
        .then(res => res.json())
        .then(setData)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }, []);
    

    return { data, isError, isLoading }
}