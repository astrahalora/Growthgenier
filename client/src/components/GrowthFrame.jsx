import { useState } from "react";
import { useFetch } from "../utilities/useFetch";
import GrowthKeeper from "./GrowthKeeper";
import GrowthOptions from "./GrowthOptions";
import Welcome from "./Welcome";
import Loading from "../pages/Loading";
import ErrorPage from "../pages/ErrorPage";

const URL = "http://127.0.0.1:5000/api/growth";

export default function GrowthFrame() {
  const title = "Dirt";
  const { data, isLoading, isError } = useFetch(URL);

  return (
    <div className="container h-100">
      { isLoading ? (
        <Loading/>
      ) : isError ? (
        <ErrorPage/>
      ) : (
        <div className="row mt-4">
        <Welcome title={title} />
        <GrowthKeeper />
        <GrowthOptions />
      </div>
      ) }
    </div>
  );
}
