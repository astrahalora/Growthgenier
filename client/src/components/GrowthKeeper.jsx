import {useMemo } from "react";

export default function GrowthKeeper({ projects }) {
  const pickImage = useMemo(() => {
    const completedProjects = projects.filter(project => project.status).length;
    switch (completedProjects) {
      case 0:
        return "https://images2.imgbox.com/a8/c5/HKbYaDUB_o.jpg";
      case 1:
        return "https://images2.imgbox.com/62/1d/lHdc0KyU_o.jpg";
      case 2:
        return "https://images2.imgbox.com/ee/52/BuoxESJD_o.jpg";
      case 3:
        return "https://images2.imgbox.com/4e/5d/Pg4xEdND_o.jpg";
      case 4:
        return "https://images2.imgbox.com/db/05/cd8hQGik_o.jpg";
      default:
        return "https://images2.imgbox.com/97/a7/jXa4cf4i_o.jpg";
    }
  }, [projects]);

  return (
    <div className="col col-lg-9 mt-3">
      <img src={pickImage} alt="Growth Stage" className="w-100 growth-keeper" />
    </div>
  );
}
