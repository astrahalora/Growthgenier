export default function GrowthOptions() {
  const completed = 0;
  return (
    <div className="col text-custom-secondary my-auto text-lg-center">
      <div>
        <div>
          <h5 className="d-inline-block px-2 me-1 bkg-nature">{completed}</h5>
          <h5 className="d-inline-block">Completed</h5>
        </div>
        <div>
          <h5 className="d-inline-block px-2 me-1 bkg-achievement">
            {completed}
          </h5>
          <h5 className="d-inline-block">In Progress</h5>
        </div>
      </div>
      <div className="row mt-lg-4">
        <div className="col-12">
          <button className="btn btn-custom">Start Project</button>
        </div>
        <div className="col-12 mt-lg-2">
          <button className="btn btn-custom">Resume Project</button>
        </div>
      </div>
    </div>
  );
}
