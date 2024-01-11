import { useMemo } from "react";

export default function YourComponent({ projects }) {
  const getTitle = useMemo(() => {
    const completedProjects = projects.filter(project => project.status).length;
    switch (completedProjects) {
      case 0:
        return "Dirt";
      case 1:
        return "Flower";
      case 2:
      case 3:
      case 4:
        return "Flowers";
      default:
        return "Magnificent Planter";
    }
  }, [projects]);

  return (
    <div className=" col-12 mx-auto text-center">
      <h2 className="d-inline-block title-style bkg-achievement pt-1 pb-2 px-5">Welcome to your {getTitle}!</h2>
    </div>
  );
}

