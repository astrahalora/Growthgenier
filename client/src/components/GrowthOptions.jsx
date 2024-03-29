import { useNavigate } from "react-router-dom";

export default function GrowthOptions({ projects }) {
  const navigate = useNavigate();
  const completedProjects = projects.length ? projects.filter(project => project.status).length : 0;
  const incompleteProjects = projects.length ? projects.filter(project => project.status === false).length : 0;
  
  return (
    <div className="col-12 col-lg my-auto text-center">
      <div className="row mt-4 mt-lg-0">
        <div className="col col-lg-12">
          <h5 className="d-inline-block px-3 me-2 py-1 bkg-nature rounded-2">
            {completedProjects}
          </h5>
          <h5 className="d-inline-block px-3 me-2 py-1 bkg-nature rounded-2">Completed</h5>
        </div>
        <div className="col col-lg-12">
          <h5 className="d-inline-block px-3 me-2 py-1 bkg-achievement rounded-2">
            {incompleteProjects}
          </h5>
          <h5 className="d-inline-block px-3 me-2 py-1 bkg-achievement rounded-2">In Progress</h5>
        </div>
      </div>
      <div className="row mt-lg-4">
        <div className="col col-lg-12">
          <button 
          className="btn btn-custom" 
          onClick={() => navigate("/new-project")}
          >Start Project</button>
        </div>
        <div className="col col-lg-12 mt-lg-2">
          <button className="btn btn-custom" 
          onClick={() => navigate("/current-project")}
          disabled={incompleteProjects === 0}
          >Latest Project</button>
        </div>
      </div>
    </div>
  );
}
