import ProjectTable from "../components/ProjectTable";
import { useFetch } from "../utilities/useFetch";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

export default function CurrentProject() {
  const { data, isError, isLoading } = useFetch();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <ProjectTable data={data[data.length - 1]} />
      )}
    </>
  );
}

