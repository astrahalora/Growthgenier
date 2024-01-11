import loading from "../assets/images/loading.gif";

export default function Loading() {
    return (
          <div className="mt-5 d-flex justify-content-center align-items-center">
            <img src={loading} alt="Loading" />
          </div>
    );
}
