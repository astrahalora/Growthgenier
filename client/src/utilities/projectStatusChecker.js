import done from "../assets/images/done_marker.png";
import wip from "../assets/images/wip_marker.jpg";

const checkProjectStatus = (projectStatus, element) => {
    const condition = projectStatus === false;
    if (element === "status") {
        return condition ? "In Progress" : "Completed";
    } else if (element === "bkg") {
        return condition ? "bkg-achievement" : "bkg-nature";
    } else {
        return condition ? wip : done;
    }
};

export { checkProjectStatus };