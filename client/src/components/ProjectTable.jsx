import ProjectName from "./ProjectName";
import ProjectStatus from "./ProjectStatus";
import TaskItem from "./TaskItem";

export default function ProjectTable({ project, statusChange, saveTask }) {
    const sortedTasks = [...project.tasks].sort((a, b) => {
        return a.taskStatus === b.taskStatus ? 0 : a.taskStatus ? 1 : -1;
    });

    return (
        <div className="container d-flex flex-column align-items-center mt-4">
            <ProjectName projectName={project.name}/>
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
            <ProjectStatus projectStatus={project.status} />
        </div>
    );
}
