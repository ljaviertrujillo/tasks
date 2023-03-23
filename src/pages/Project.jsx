import React, { useContext, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { addNewTask } from "../firebase/projectController";
import { initializeProjects } from '../App'

import ProjectDetail from "../components/pure/ProjectDetail";
import { ProjectContext } from "../Provider/ProjectProvider";
import { favoriteProject } from "../firebase/projectController";
import Tasks from "./Tasks";
import NotFound from "./NotFound";
import TaskForm from '../components/Form/TaskForm'
import TaskList from "../components/container/TaskList";
import SecondaryMenu from "../components/container/SecondaryMenu";

const Project = () => {
  const { state, dispatch } = useContext(ProjectContext);
  const { projects } = state;
  const location = useLocation();
  const projectId = location.state;
  const projectFound = projects.find((project) => project.id === projectId);
  const isValid = projectFound !== null;

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
      {isValid && projectFound !== undefined ? (
        <div className="flex flex-col gap-2">
          <ProjectDetail project={projectFound} favoriteProject={favProject} />
          <SecondaryMenu />
          <TaskList />
        </div>
      ) : projects.length > 0 ? (
        <NotFound />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Project;
