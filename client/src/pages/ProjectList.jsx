import { useState, useEffect } from "react";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import ProjectPreview from "../components/ProjectPreview";

export default function ProjectList() {
  const [data, setData] = useState();
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
          setData(data);
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <div className="container d-flex flex-column align-items-center mt-4">
          {data?.map(project => (
            <ProjectPreview project={project} key={project._id}/>
          ))}
        </div>
      )}
    </>
  );
}
