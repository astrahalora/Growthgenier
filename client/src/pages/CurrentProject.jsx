import { useFetch } from "../utilities/useFetch";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

export default function CurrentProject() {
  const { data, isError, isLoading } = useFetch();

  const handleStatusChange = () => {

  }

  const checkProjectStatus = (projectStatus) => {
    return projectStatus === false ? "In Progress" : "Completed";
  }

  const applyProgressStatusBackground = (projectStatus) => {
    return projectStatus === false ? "bkg-achievement" : "bkg-nature";
  }

  return (
    <>
      { isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
          <div className="container mt-4">
            <h2 className="text-center">{data[data.length-1].name}</h2>
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
                {data[data.length-1].tasks.map((task) => (
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
            <div className={`${applyProgressStatusBackground(data[data.length-1].status)} p-2 text-center`}>
                <h3>Status: {checkProjectStatus(data[data.length-1].status)}</h3>
            </div>
          </div>
      )}
    </>
  );
}

