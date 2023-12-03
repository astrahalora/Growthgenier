import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "TASKS";

export default function ProjectForm() {
    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState(() => {
        const value = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (value === null) return [];
        return JSON.parse(value);
    });

    const addTask = () => {
        if (newTaskName === "") return;
        setTasks((prevTasks) => [...prevTasks, { name: newTaskName, id: crypto.randomUUID() }]);
        setNewTaskName("");
    };

    const deleteTask = (taskId) => {
        setTasks(tasks => tasks.filter(task => task.id !== taskId));
    }

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setTasks([]);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input 
                type="text" 
                name="name"
                id="name" 
                placeholder="Prepare for the Holidays" 
                />
            </div>

            <div>
                <h4>Tasks:</h4>
                <ul>
                    {tasks && tasks.length ? tasks.map((task) => (
                                <li key={task.id} className="p-2 fs-5">
                                    <p className="d-inline">{task.name}</p>
                                    <button type="button" className="btn btn-custom m-2" onClick={() => deleteTask(task.id)}>X</button>
                                </li>
                        )) : null}
                </ul>
                <label htmlFor="task">Task:</label>
                <input
                    type="text"
                    name="task"
                    id="task"
                    placeholder="Shop for presents"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                />
                <button type="button" className="btn btn-custom" onClick={addTask}>
                    Add
                </button>
            </div>

            <button type="submit">Start Project</button>
        </form>
    );
}
