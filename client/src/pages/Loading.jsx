import loading from "../assets/images/loading.gif";

export default function Loading() {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <img src={loading} alt="Loading" className="loading" />
    </div>
  );
}
