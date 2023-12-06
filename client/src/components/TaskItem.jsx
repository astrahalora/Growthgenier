import { useState, useRef } from "react";

export default function TaskItem({ project, task, statusChange, saveTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const nameRef = useRef();

    const checkTaskStatus = (taskStatus, element) => {
        const condition = taskStatus === false;
        if (element === "text") {
            return condition ? null : "text-decoration-line-through";
        } else {
            return condition ? null : "bkg-dark-fill";
        }
    }

    const handleEdit = () => {
        setIsEditing(false);

        if (nameRef.current.value === "") return;
        saveTask(project, task._id, nameRef.current.value);
    }

    return (
        <>
            {isEditing ? (
                <tr className="bkg">
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
                        <span>{task.taskName}</span>
                    </td>
                    <td className="lh-lg">
                        <input
                            type="checkbox"
                            defaultChecked={task.taskStatus}
                            onChange={() => statusChange(project, task)}
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
                        <button type="button" className="btn btn-custom">
                            Delete
                        </button>
                    </td>
                </tr>
            )}
        </>
    );
}
