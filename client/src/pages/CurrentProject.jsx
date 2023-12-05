import { useEffect, useState } from "react";
import ProjectTable from "../components/ProjectTable";
import { usePatch } from "../utilities/usePatch";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

export default function CurrentProject() {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stateChanged, setStateChaged] = useState(false);

  const getProjects = async (controller) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/growth", { signal: controller.signal });
      if (response.status === 200) {
        const data = await response.json();
        setData(data);
      } else {
        throw new Error("Request failed");
      }
    } catch(error) {
      if(e.name === "AbortError") return;
      setIsError(true);
    } finally {
      if(controller.signal.aborted) return;
      setIsLoading(false)
    }
  }

  useEffect(() => {
      const abortController = new AbortController();
      getProjects(abortController);
      return () => abortController.abort();
  }, [stateChanged])
  
  const handleTaskStatusChange = (project, task) => {
      const updatedProject = JSON.parse(JSON.stringify(project));
      updatedProject.tasks.forEach(item => item._id === task._id ? item.taskStatus = !item.taskStatus : null);

      usePatch(project._id, updatedProject)
      .then(() => {
          setStateChaged(prev => !prev)
      })
      .catch(err => {
          console.error(err.message);
      });
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <ProjectTable project={data[data.length - 1]} statusChange={handleTaskStatusChange} />
      )}
    </>
  );
}

