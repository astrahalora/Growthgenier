
import { checkProjectStatus } from "../utilities/projectStatusChecker";

export default function ProjectStatus({ projectStatus }) {
    return (
        <div
            className={`${checkProjectStatus(projectStatus,"bkg")} 
            p-2 text-center w-100 project-confines position-relative mb-4 mb-md-0`}>
            <img
                src={checkProjectStatus(projectStatus, "pic")}
                alt="Status Marker"
                className="position-absolute top-0 start-0 h-100"
            />
            <h3>Status: {checkProjectStatus(projectStatus, "status")}</h3>
        </div>
    );
}
