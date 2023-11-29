import GrowthKeeper from "./GrowthKeeper";
import GrowthOptions from "./GrowthOptions";
import Welcome from "./Welcome";

export default function GrowthFrame() {
  const title = "Dirt";

  return (
    <div className="container">
      <div className="row mt-4">
        <Welcome title={title} />
        <GrowthKeeper />
        <GrowthOptions />
      </div>
    </div>
  );
}
