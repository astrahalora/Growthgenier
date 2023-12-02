import { useFetch } from "../utilities/useFetch";
import GrowthKeeper from "./GrowthKeeper";
import GrowthOptions from "./GrowthOptions";
import Welcome from "./Welcome";
import Loading from "../pages/Loading";
import ErrorPage from "../pages/ErrorPage";

export default function GrowthFrame() {
  const { data, isLoading, isError } = useFetch();

  return (
    <div className="container growth-frame">
      { isLoading ? (
        <Loading/>
      ) : isError ? (
        <ErrorPage/>
      ) : (
        <div className="row mt-4">
        <Welcome title={data[0].level} />
        <GrowthKeeper image={data[0].image} />
        <GrowthOptions />
      </div>
      ) }
    </div>
  );
}
