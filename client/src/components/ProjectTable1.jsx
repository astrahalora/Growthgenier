import done from "../assets/images/done_marker.png";
import wip from "../assets/images/wip_marker.jpg";

export default function ProjectTable({ project, statusChange }) {

    const checkProjectStatus = (projectStatus, element) => {
        const condition = projectStatus === false;
        if(element === "status") {
            return condition ? "In Progress" : "Completed";
        } else if (element === "bkg") {
            return condition ? "bkg-achievement" : "bkg-nature";
        } else {
            return condition ? wip : done;
        }
    }

    const checkTaskStatus = (taskStatus, element) => {
        const condition = taskStatus === false;
        if (element === "text") {
            return condition ? null : "text-decoration-line-through";
        } else {
            return condition ? null : "bkg-dark-fill";
        }
    }

    const sortedTasks = [...project.tasks].sort((a, b) => {
        return a.taskStatus === b.taskStatus ? 0 : a.taskStatus ? 1 : -1;
    });

    const editTask = (task) => {

    }

    return <div className="container d-flex flex-column align-items-center mt-4">
        <h2 className="text-center project-name">{project.name}</h2>
        <table className="table bkg-fill mt-3">
            <thead>
                <tr className="bkg-achievement">
                    <th scope="col">Task</th>
                    <th scope="col">Completed</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {sortedTasks?.map((task, i) => (
                    <tr key={task._id} className={`${checkTaskStatus(task.taskStatus, "bkg")}`}>
                        <td className={`lh-lg ${checkTaskStatus(task.taskStatus, "text")}`}>
                            <span>{task.taskName}</span>
                            {/* <input 
                            type="text" 
                            name={`task-${i}`} 
                            id={`task-${i}`}
                            defaultValue={task.taskName}
                             /> */}
                        </td>
                        <td className="lh-lg">
                            <input
                                type="checkbox"
                                defaultChecked={task.taskStatus}
                                onChange={() => statusChange(project, task)}
                            />
                        </td>
                        <td>
                            <button type="button" 
                            className="btn btn-custom"
                            onClick={() => editTask(task)}>
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
        <div className={`${checkProjectStatus(project.status, "bkg")} p-2 text-center w-100 project-status position-relative`}>
        <img src={checkProjectStatus(project.status, "pic")} alt="Status Marker" className="position-absolute top-0 start-0 h-100"/>
            <h3>Status: {checkProjectStatus(project.status, "status")}</h3>
        </div>
    </div>
}