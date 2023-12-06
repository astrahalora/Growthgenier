export default function ProjectTable({ project, statusChange }) {

    const checkProjectStatus = (projectStatus) => {
        return projectStatus === false ? "In Progress" : "Completed";
    }

    const applyProgressStatusBackground = (projectStatus) => {
        return projectStatus === false ? "bkg-achievement" : "bkg-nature";
    }

    const checkTaskStatus = (taskStatus, element) => {
        const condition = taskStatus === false;
        if (element === "text") {
            return condition ? "" : "text-decoration-line-through";
        } else {
            return condition ? "" : "bkg-dark-fill";
        }
    }

    const sortedTasks = [...project.tasks].sort((a, b) => {
        return a.taskStatus === b.taskStatus ? 0 : a.taskStatus ? 1 : -1;
    });

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
                {sortedTasks?.map((task) => (
                    <tr key={task._id} className={`${checkTaskStatus(task.taskStatus, "bkg")}`}>
                        <td className={`lh-lg ${checkTaskStatus(task.taskStatus, "text")}`}>
                            {task.taskName}
                        </td>
                        <td className="lh-lg">
                            <input
                                type="checkbox"
                                defaultChecked={task.taskStatus}
                                onChange={() => statusChange(project, task)}
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