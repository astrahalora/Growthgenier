import { useMemo } from "react";

export default function YourComponent({ projects }) {
  const getTitle = useMemo(() => {
    const completedProjects = projects.filter(project => project.status).length;
    switch (completedProjects) {
      case 1:
        return "Flower";
      case 2:
        return "Flowers";
      default:
        return "Dirt";
    }
  }, [projects]);

  return (
    <div className=" col-12 mx-auto text-center">
      <h2>Welcome to your {getTitle}!</h2>
    </div>
  );
}

