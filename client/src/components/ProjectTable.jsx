export default function ProjectTable({ data }) {
    const handleStatusChange = () => {

    }

    const checkProjectStatus = (projectStatus) => {
        return projectStatus === false ? "In Progress" : "Completed";
    }

    const applyProgressStatusBackground = (projectStatus) => {
        return projectStatus === false ? "bkg-achievement" : "bkg-nature";
    }

    return <div className="container mt-4">
        <h2 className="text-center">{data.name}</h2>
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
                {data.tasks.map((task) => (
                    <tr key={task._id}>
                        <td className="lh-lg">{task.taskName}</td>
                        <td className="lh-lg">
                            <input
                                type="checkbox"
                                defaultChecked={task.taskStatus}
                                onChange={() => handleStatusChange(task)}
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
        <div className={`${applyProgressStatusBackground(data.status)} p-2 text-center`}>
            <h3>Status: {checkProjectStatus(data.status)}</h3>
        </div>
    </div>
}