import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../utilities/usePost";
import Loading from "./Loading";

const LOCAL_STORAGE_KEY = "TASKS";

export default function ProjectCreator() {
    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState(() => {
        const value = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (value === null) return [];
        return JSON.parse(value);
    });
    const [isPending, setIsPending] = useState(false);
    const nameInputRef = useRef();
    const navigate = useNavigate();

    const addTask = () => {
        if (newTaskName === "") return;
        setTasks((prevTasks) => [
            ...prevTasks,
            { taskName: newTaskName, id: crypto.randomUUID() },
        ]);
        setNewTaskName("");
    };

    const deleteTask = (taskId) => {
        setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
    };

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (tasks.length === 0) return;
        const projectData = {
            name: nameInputRef.current.value,
            tasks: tasks,
        };
        setIsPending(true);

        usePost(projectData)
            .then(() => {
                setIsPending(false);
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                setTasks([]);
                navigate("/current-project");
            })
            .catch(err => {
                console.error(err.message);
            });
    };

    if (isPending) {
        return <Loading />
    }

    return (
        <form onSubmit={handleFormSubmit} className="container p-5 form-box mt-4 bkg-fill rounded-3 text-achievement">
            <div className="row mx-auto">
                <label htmlFor="name" className="col-2 form-label lh-lg">
                    Name:
                </label>
                <input
                    className="col-8 p-1 ps-3"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Prepare for the Holidays"
                    ref={nameInputRef}
                    required
                />
            </div>

            <div className="row mx-auto">
                <h4 className="col-12 text-center mt-3">Tasks:</h4>
                <ul className="col-12 text-center list-unstyled">
                    {tasks && tasks.length
                        ? tasks.map((task) => (
                            <li key={task.id} className="fs-6">
                                <p className="d-inline">{task.taskName}</p>
                                <button
                                    type="button"
                                    className="btn btn-custom m-1 ms-2"
                                    onClick={() => deleteTask(task.id)}>
                                    X
                                </button>
                            </li>
                        )) : null}
                </ul>
                <label htmlFor="task" className="col-2 form-label lh-lg">
                    Task:
                </label>
                <input
                    className="col-8"
                    type="text"
                    name="task"
                    id="task"
                    placeholder="Shop for presents"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-custom col-2"
                    onClick={addTask}>
                    Add
                </button>
            </div>

            <div className="row d-flex justify-content-center mt-4">
                <div className="col-4"></div>
                <button type="submit" className="btn btn-custom col-4">
                    Start Project
                </button>
                <div className="col-4"></div>
            </div>
        </form>
    );
}
