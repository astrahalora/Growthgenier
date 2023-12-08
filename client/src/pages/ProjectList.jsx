import { useState, useEffect } from "react";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import ProjectPreview from "../components/ProjectPreview";
import { filterByStatus } from "../utilities/projectStatusChecker";
import ProjectSort from "../components/ProjectSort";

export default function ProjectList() {
    const [data, setData] = useState();
    const [filteredData, setFilteredData] = useState();
    const [dataToDisplay, setDataToDisplay] = useState();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [stateChanged, setStateChaged] = useState(false);

    useEffect(() => {
        const getLastIncompleteProject = async (controller) => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:5000/api/growth",
                    { signal: controller.signal }
                );
                if (response.status === 200) {
                    const data = await response.json();
                    const reversedData = data.reverse();
                    setData(reversedData);
                    setFilteredData(reversedData);
                    setDataToDisplay(reversedData);
                } else {
                    throw new Error("Request failed");
                }
            } catch (error) {
                if (e.name === "AbortError") return;
                setIsError(true);
            } finally {
                if (controller.signal.aborted) return;
                setIsLoading(false);
            }
        };
        const abortController = new AbortController();
        getLastIncompleteProject(abortController);
        return () => abortController.abort();
    }, [stateChanged]);

    const filterByCompletion = (input, select) => {
        const optionName = select.current.value;
        input.current.value = "";
        // reset both dataToDisplay and filteredData to base data 
        setDataToDisplay(data);
        setFilteredData(data);

        // if want to view all projects, already done, so return
        if(optionName === "-- All Projects --") return;

        // if want to view completed or in progress, filter both
        setDataToDisplay(prev =>  filterByStatus(prev, optionName));
        setFilteredData(prev =>  filterByStatus(prev, optionName));
    };
    
    const searchByName = (input) => {
        const searchPhrase = input.current.value.toLowerCase();
        // set dataToDisplay to last value of filteredData
        // since we're not manipulating filteredData here, can always be baseline
        setDataToDisplay(filteredData);
        setDataToDisplay(prev => {
            return [...prev]
            .filter(item => item.name.toLowerCase().includes(searchPhrase))
        });
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <ErrorPage />
            ) : (
                <div className="container d-flex flex-column align-items-center mt-4">
                    <ProjectSort filter={filterByCompletion} search={searchByName}/>
                    {dataToDisplay && (dataToDisplay.length > 0) && dataToDisplay.map(project => (
                        <ProjectPreview project={project} key={project._id} />
                    ))}
                </div>
            )}
        </>
    );
}
