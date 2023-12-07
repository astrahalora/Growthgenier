import done from "../assets/images/done_marker.png";
import wip from "../assets/images/wip_marker.jpg";

export default function ProjectStatus({ projectStatus }) {
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

    return (
        <div
            className={`${checkProjectStatus(projectStatus,"bkg")} 
            p-2 text-center w-100 project-status position-relative`}>
            <img
                src={checkProjectStatus(projectStatus, "pic")}
                alt="Status Marker"
                className="position-absolute top-0 start-0 h-100"
            />
            <h3>Status: {checkProjectStatus(projectStatus, "status")}</h3>
        </div>
    );
}
