import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePatch } from "../utilities/usePatch";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import ProjectTable from "../components/ProjectTable";
import { updateProjectStatus } from "../utilities/projectStatusChecker";

export default function SelectedProject() {
  let { projectId } = useParams();
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stateChanged, setStateChanged] = useState(false);

  useEffect(() => {
    const getSelectedProject = async (controller) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/growth/${projectId}`, { signal: controller.signal });
        if (response.status === 200) {
          const data = await response.json();
          setData(data[0]);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        if (error.name === "AbortError") return;
        setIsError(true);
      } finally {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      }
    }
    const abortController = new AbortController();
    getSelectedProject(abortController);
    return () => abortController.abort();
  }, [stateChanged]);

  const handleAddNewTask = (project, newTaskName) => {
    if (newTaskName === "") return;
    const updatedProject = JSON.parse(JSON.stringify(project));
    updatedProject.tasks.push({ taskName: newTaskName });
    updateProjectStatus(updatedProject);

    usePatch(project._id, updatedProject)
      .then(() => setStateChanged(prev => !prev))
      .catch(err => {
        console.error(err.message);
      });
  }

  const handleTaskStatusChange = (project, taskId) => {
    const updatedProject = JSON.parse(JSON.stringify(project));
    updatedProject.tasks
      .forEach(item => item._id === taskId ? item.taskStatus = !item.taskStatus : null);
    updateProjectStatus(updatedProject);

    usePatch(project._id, updatedProject)
      .then(() => setStateChanged(prev => !prev))
      .catch(err => {
        console.error(err.message);
      });
  }

  const handleSaveEditedTask = (project, taskId, newTaskName) => {
    const updatedProject = JSON.parse(JSON.stringify(project));
    updatedProject.tasks
      .forEach(item => item._id === taskId ? item.taskName = newTaskName : null);

    usePatch(project._id, updatedProject)
      .then(() => setStateChanged(prev => !prev))
      .catch(err => {
        console.error(err.message);
      });
  }

  const handleTaskDelete = (project, taskId) => {
    const updatedProject = JSON.parse(JSON.stringify(project));
    const updatedTasks = updatedProject.tasks.filter(item => item._id !== taskId);
    updatedProject.tasks = updatedTasks;
    updateProjectStatus(updatedProject);

    usePatch(project._id, updatedProject)
      .then(() => setStateChanged(prev => !prev))
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
        <ProjectTable
          project={data}
          addNewTask={handleAddNewTask}
          statusChange={handleTaskStatusChange}
          saveTask={handleSaveEditedTask}
          deleteTask={handleTaskDelete}
        />
      )}
    </>
  );
}