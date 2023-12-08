import { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import ProjectPreview from "../components/ProjectPreview";

export default function ProjectList() {
    const [data, setData] = useState();
    const [filteredData, setFilteredData] = useState();
    const [dataToDisplay, setDataToDisplay] = useState();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [stateChanged, setStateChaged] = useState(false);
    const selectElement = useRef();
    const inputElement = useRef();

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

    const filterByCompletion = () => {
        const optionName = selectElement.current.value;
        inputElement.current.value = "";
        // reset both dataToDisplay and filteredData to base data 
        setDataToDisplay(data);
        setFilteredData(data);

        // if want to view all projects, already done, so return
        if(optionName === "-- All Projects --") return;

        // if want to view completed or in progress, filter both
        const filterByStatus = (projects) => {
            return [...projects].filter(item => {
                if(optionName === "Completed") return item.status;
                return !item.status;
            })
        }
        setDataToDisplay(prev =>  filterByStatus(prev));
        setFilteredData(prev =>  filterByStatus(prev));
    };
    
    const searchByName = () => {
        const searchPhrase = inputElement.current.value.toLowerCase();
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
                    <div className="row">
                        <select
                            name="project-type"
                            id="project-type"
                            className="col text-center bkg-achievement p-2 rounded-2"
                            onChange={filterByCompletion}
                            ref={selectElement}
                        >
                            <option>-- All Projects --</option>
                            <option>Completed</option>
                            <option>In Progress</option>
                        </select>
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Search..."
                            className="col ms-2 p-2"
                            ref={inputElement}
                            onChange={searchByName}
                        />
                    </div>
                    {dataToDisplay && (dataToDisplay.length > 0) && dataToDisplay.map(project => (
                        <ProjectPreview project={project} key={project._id} />
                    ))}
                </div>
            )}
        </>
    );
}
