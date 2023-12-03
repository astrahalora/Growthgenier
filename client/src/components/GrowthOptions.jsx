import { useNavigate } from "react-router-dom";

export default function GrowthOptions({ projects }) {
  const navigate = useNavigate();

  return (
    <div className="col text-custom-secondary my-auto text-lg-center">
      <div>
        <div>
          <h5 className="d-inline-block px-3 me-2 py-1 bkg-nature rounded-2">
            {projects.length ? projects.filter(project => project.status === true).length : 0 }
          </h5>
          <h5 className="d-inline-block">Completed</h5>
        </div>
        <div>
          <h5 className="d-inline-block px-3 me-2 py-1 bkg-achievement rounded-2">
            {projects.length ? projects.filter(project => project.status === false).length : 0}
          </h5>
          <h5 className="d-inline-block">In Progress</h5>
        </div>
      </div>
      <div className="row mt-lg-4">
        <div className="col-12">
          <button className="btn btn-custom" onClick={() => navigate("/new-project")}>Start Project</button>
        </div>
        <div className="col-12 mt-lg-2">
          <button className="btn btn-custom">Resume Project</button>
        </div>
      </div>
    </div>
  );
}
