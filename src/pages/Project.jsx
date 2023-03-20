import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ProjectDetail from "../components/pure/ProjectDetail";
import { ProjectContext } from "../Provider/ProjectProvider";
import { favoriteProject } from "../firebase/projectController";
import Tasks from "./Tasks";
import NotFound from "./NotFound";

const Project = () => {
  const { state, dispatch } = useContext(ProjectContext);
  const { projects } = state;
  const [projectFound, setProjectFound] = useState(null);
  const [tasksFound, setTasksFound] = useState(null)
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();
  const projectId = location.pathname.split('/')[2]

  useEffect (() => {
    if(projects.length > 0) {
      const isValidProject = projects.some(project => project.id === projectId)
      if(isValidProject){
        const project = projects.find(project => project.id === projectId)
        setProjectFound(project)
        const {tasks} = project
        setTasksFound(tasks)
        setIsValid(true)
      } else{
        setIsValid(false)
      }
    }
  }, [projects, projectId])

  const favProject = async () => {
    const { id, favorite } = projectFound;
    await favoriteProject(id, favorite);
    dispatch({
      type: "FAVORITE_PROJECT",
      payload: projectId,
    });
  };

  return (
    <>
      {isValid ? projectFound !== null ? (
        <div className="project flex flex-col">
          <ProjectDetail project={projectFound} favoriteProject={favProject} />
          {tasksFound !== null ? <Tasks /> : null }
        </div>
      ) : <div>Loading...</div> : <NotFound /> }
    </>
  );
};

export default Project;
