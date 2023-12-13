import { useFetch } from "../utilities/useFetch";
import GrowthKeeper from "./GrowthKeeper";
import GrowthOptions from "./GrowthOptions";
import Welcome from "./Welcome";
import Loading from "../pages/Loading";
import ErrorPage from "../pages/ErrorPage";

export default function GrowthFrame() {
  const { data, isLoading, isError } = useFetch();

  return (
    <div className="container p-0 growth-frame">
      { isLoading ? (
        <Loading/>
      ) : isError ? (
        <ErrorPage/>
      ) : (
      <div className="row m-0 p-0 mt-4">
        <Welcome projects={data} />
        <GrowthKeeper projects={data} />
        <GrowthOptions projects={data} />
      </div>
      )}
    </div>
  );
}
