import { useState, useEffect } from "react";
import { usePatch } from "../utilities/usePatch";

export default function ProjectTable({ project }) {
    const [stateChanged, setStateChaged] = useState(false);

    useEffect(() => {
        if (stateChanged) {
            window.location.reload();
        }
    }, [stateChanged])
    
    const handleStatusChange = (project, task) => {
        const updatedProject = JSON.parse(JSON.stringify(project));
        updatedProject.tasks.forEach(item => item._id === task._id ? item.taskStatus = !item.taskStatus : null)

        usePatch(project._id, updatedProject)
        .then(() => {
            setStateChaged(prev => !prev)
        })
        .catch(err => {
            console.error(err.message);
        });
    }

    const checkProjectStatus = (projectStatus) => {
        return projectStatus === false ? "In Progress" : "Completed";
    }

    const applyProgressStatusBackground = (projectStatus) => {
        return projectStatus === false ? "bkg-achievement" : "bkg-nature";
    }

    const checkTaskStatus = (taskStatus) => {
        return taskStatus === false ? "" : "text-decoration-line-through";
    }

    return <div className="container mt-4">
        <h2 className="text-center">{project.name}</h2>
        <table className="table bkg-fill">
            <thead>
                <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Completed</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {project.tasks.map((task) => (
                    <tr key={task._id}>
                        <td className={`lh-lg ${checkTaskStatus(task.taskStatus)}`}>
                            {task.taskName}
                        </td>
                        <td className="lh-lg">
                            <input
                                type="checkbox"
                                defaultChecked={task.taskStatus}
                                onChange={() => handleStatusChange(project, task)}
                            ></input>
                        </td>
                        <td>
                            <button type="button" className="btn btn-custom">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-custom">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className={`${applyProgressStatusBackground(project.status)} p-2 text-center`}>
            <h3>Status: {checkProjectStatus(project.status)}</h3>
        </div>
    </div>
}