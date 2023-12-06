import done from "../assets/images/done_marker.png";
import wip from "../assets/images/wip_marker.jpg";
import TaskItem from "./TaskItem";

export default function ProjectTable({ project, statusChange, saveTask }) {

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

    const sortedTasks = [...project.tasks].sort((a, b) => {
        return a.taskStatus === b.taskStatus ? 0 : a.taskStatus ? 1 : -1;
    });

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
                {sortedTasks?.map((task) => (
                    <TaskItem 
                    key={task._id} 
                    project={project} 
                    task={task} 
                    statusChange={statusChange}
                    saveTask={saveTask}
                    />
                ))}
            </tbody>
        </table>
        <div className={`${checkProjectStatus(project.status, "bkg")} p-2 text-center w-100 project-status position-relative`}>
        <img src={checkProjectStatus(project.status, "pic")} alt="Status Marker" className="position-absolute top-0 start-0 h-100"/>
            <h3>Status: {checkProjectStatus(project.status, "status")}</h3>
        </div>
    </div>
}