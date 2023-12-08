import { checkProjectStatus } from "../utilities/projectStatusChecker";
import { calculateCompletionWidth } from "../utilities/calculators";
import { useNavigate } from "react-router-dom";

export default function ProjectPreview({ project }) {
    const completionWidth = calculateCompletionWidth(project);
    const navigate = useNavigate();

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
                <button type="button" className="btn btn-custom"
                onClick={() => navigate(`/project/${project._id}`)}
                >
                    Resume
                </button>
                <button type="button" className="btn btn-custom mt-2">
                    Delete
                </button>
            </div>
        </div>
    );
}
