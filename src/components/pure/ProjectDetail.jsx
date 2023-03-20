import React from "react";
import { Duedate, FavoriteButton } from "./components";

const ProjectDetail = ({ project, favoriteProject}) => {
   const {title, dueDate, favorite} = project

  return (
    <div className="p-4">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl">{title.toUpperCase()}</h1>
            <FavoriteButton handle={favoriteProject} fav={favorite} />
          </div>
          <div className="members">J</div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="tags">Design</div>
        <Duedate dueDate={dueDate} />
      </div>
    </div>
  );
};

export default ProjectDetail;
