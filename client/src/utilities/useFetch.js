import { useState } from "react";

export function useFetch() {
    const [data, setData] = useState();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    

    return { data, isError, isLoading }
}