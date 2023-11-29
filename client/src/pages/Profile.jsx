import Welcome from "../components/Welcome";

export default function Profile() {
  const title = "Dirt";
  
  return (
    <div className="container">
      <Welcome title={title} />
    </div>
  );
}
