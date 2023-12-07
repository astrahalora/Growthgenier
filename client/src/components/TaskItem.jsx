import { useState, useRef } from "react";

export default function TaskItem({ project, task, statusChange, saveTask, deleteTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const nameRef = useRef();

    const checkTaskStatus = (taskStatus, element) => {
        if (element === "text") {
            return taskStatus ? "text-decoration-line-through" : null;
        } else {
            return taskStatus ? "bkg-dark-fill" : null;
        }
    }

    const handleEdit = () => {
        setIsEditing(false);

        if (nameRef.current.value === "" || nameRef.current.value === task.taskName) return;
        saveTask(project, task._id, nameRef.current.value);
    }

    return (
        <>
            {isEditing ? (
                <tr className={`${checkTaskStatus(task.taskStatus, "bkg")}`}>
                    <td colSpan="2">
                        <input
                            autoFocus
                            type="text"
                            className="p-1 w-100"
                            defaultValue={task.taskName}
                            ref={nameRef}
                        />
                    </td>
                    <td>
                        <button type="button" className="btn btn-custom" onClick={handleEdit}>
                            Save
                        </button>
                    </td>
                    <td></td>
                </tr>
            ) : (
                <tr className={`${checkTaskStatus(task.taskStatus, "bkg")}`}>
                    <td className={`lh-lg ${checkTaskStatus(task.taskStatus, "text")}`}>
                        {task.taskName}
                    </td>
                    <td className="lh-lg">
                        <input
                            type="checkbox"
                            defaultChecked={task.taskStatus}
                            onChange={() => statusChange(project, task._id)}
                        />
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-custom"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                    </td>
                    <td>
                        <button 
                            type="button" 
                            className="btn btn-custom"
                            onClick={() => deleteTask(project, task._id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            )}
        </>
    );
}
