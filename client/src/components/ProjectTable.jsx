import AddNewTask from "./AddNewTask";
import ProjectName from "./ProjectName";
import ProjectStatus from "./ProjectStatus";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";

export default function ProjectTable({ project, addNewTask, statusChange, saveTask, deleteTask }) {
    const navigate = useNavigate();
    if(project.tasks === null) {
        navigate("/");
    }
    const sortedTasks = [...project.tasks].sort((a, b) => {
        return a.taskStatus === b.taskStatus ? 0 : a.taskStatus ? 1 : -1;
    });

    return (
        <div className="container d-flex flex-column align-items-center mt-4">
            <ProjectName projectName={project.name}/>
            <table className="table bkg-fill mt-2">
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
                            addNewTask={addNewTask}
                            statusChange={statusChange}
                            saveTask={saveTask}
                            deleteTask={deleteTask}
                        />
                    ))}
                </tbody>
            </table>
            <AddNewTask project={project} addNewTask={addNewTask} />
            <ProjectStatus projectStatus={project.status} />
        </div>
    );
}
