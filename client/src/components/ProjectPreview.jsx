import { checkProjectStatus } from "../utilities/projectStatusChecker";

export default function ProjectPreview({ project }) {
    const calculateCompletionWidth = () => {
        const totalTasks = project.tasks.length;
        if (totalTasks === 0) return 0;

        const completedTasks = project.tasks.filter(task => task.taskStatus).length;
        const completionPercentage = (completedTasks / totalTasks) * 100;

        return Math.floor(completionPercentage);
    }

    const completionWidth = calculateCompletionWidth();

    return (
        <div className="d-flex">
            <div
                className={`${checkProjectStatus(project.status, "bkg")}
                project-preview d-flex mt-3`}>
                <img
                    src={checkProjectStatus(project.status, "pic")}
                    alt="Project Status"
                    className="preview-image" />
                <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
                    <h4>{project.name}</h4>
                    <div className="w-75 d-flex">
                        <div
                            className="bkg-dark-fill py-2"
                            style={{ width: `${completionWidth}%`}}>
                        </div>
                        <div
                            className="bkg-pale-fill py-2"
                            style={{ width: `${100 - completionWidth}%`}}>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bkg-fill mt-3 d-flex flex-column 
                justify-content-center align-items-center px-4">
                <button type="button" className="btn btn-custom">
                    Resume
                </button>
                <button type="button" className="btn btn-custom mt-2">
                    Delete
                </button>
            </div>
        </div>
    );
}
