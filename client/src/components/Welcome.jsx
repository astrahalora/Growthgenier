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
    <div className="mx-auto text-center">
      <h3 className="text-custom-secondary">Welcome to your {getTitle}!</h3>
    </div>
  );
}

