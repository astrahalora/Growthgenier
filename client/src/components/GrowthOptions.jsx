export default function GrowthOptions() {
    const completed = 0;
  return (
    <div className="col mt-3">
      <div>
        <div className="d-inline-block p-3">{completed}</div>
        <p className="d-inline-block">Completed</p>
      </div>
      <div>
        <div className="d-inline-block p-3">{completed}</div>
        <p className="d-inline-block">In Progress</p>
      </div>
    </div>
  );
}
