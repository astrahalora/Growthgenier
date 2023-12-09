import { useEffect, useState } from "react";
import ProjectTable from "../components/ProjectTable";
import { usePatch } from "../utilities/usePatch";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import { updateProjectStatus } from "../utilities/projectStatusChecker";

export default function CurrentProject() {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stateChanged, setStateChanged] = useState(false);

  useEffect(() => {
    const getLastIncompleteProject = async (controller) => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/growth/last-incomplete", { signal: controller.signal });
        if (response.status === 200) {
          const data = await response.json();
          setData(data);
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
    getLastIncompleteProject(abortController);
    return () => abortController.abort();
  }, [stateChanged])


  const getLastCompletedProject = async (projectId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/growth/last-complete/${projectId}`);
      if (response.status === 200) {
        const data = await response.json();
        setData(data);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      setIsError(true);
    }
  }

  const handleAddNewTask = (project, newTaskName) => {
    if(newTaskName === "") return;
    const updatedProject = JSON.parse(JSON.stringify(project));
    updatedProject.tasks.push({taskName: newTaskName});
    updateProjectStatus(updatedProject);

    usePatch(project._id, updatedProject)
      .then(() => setStateChanged(prev => !prev))
      .catch(err => {
        console.error(err.message);
      });
  }

  const handleTaskStatusChange = (project, taskId) => {
    const updatedProject = JSON.parse(JSON.stringify(project));
    updatedProject.tasks.forEach(item => item._id === taskId ? item.taskStatus = !item.taskStatus : null);
    const allTasksCompleted = updatedProject.tasks.every(item => item.taskStatus);
    updatedProject.status = allTasksCompleted;

    usePatch(project._id, updatedProject)
      .then(() => {
        if (!allTasksCompleted) {
          setStateChanged(prev => !prev)
        } else {
          getLastCompletedProject(project._id);
        }
      })
      .catch(err => {
        console.error(err.message);
      });
  }

  const handleSaveEditedTask = (project, taskId, newTaskName) => {
    const updatedProject = JSON.parse(JSON.stringify(project));
    updatedProject.tasks.forEach(item => item._id === taskId ? item.taskName = newTaskName : null);

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
    const allTasksCompleted = updatedTasks.every(item => item.taskStatus);
    updatedProject.status = allTasksCompleted;

    usePatch(project._id, updatedProject)
    .then(() => {
      if (!allTasksCompleted) {
        setStateChanged(prev => !prev)
      } else {
        getLastCompletedProject(project._id);
      }
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

