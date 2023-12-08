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
        setDataToDisplay(data);
        setDataToDisplay(prev =>  [...prev].filter(item => {
            if(optionName === "Completed") return item.status;
            if(optionName === "In Progress") return !item.status;
            return item;
        }));
        setFilteredData(dataToDisplay);
    }

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
                            className="col text-center bkg-achievement p-2"
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
                            className="col ms-2 p-2" />
                    </div>
                    {dataToDisplay.length > 0 && dataToDisplay.map(project => (
                        <ProjectPreview project={project} key={project._id} />
                    ))}
                </div>
            )}
        </>
    );
}
