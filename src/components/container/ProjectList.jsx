import React, { useContext } from "react";
import "../../styles/projects.scss";
import { Link } from "react-router-dom";
import ProjectsForm from "../Form/ProjectsForm";
import useToggle from "../../hooks/useToggle";

import { ProjectContext } from "../../Provider/ProjectProvider";

//components
import {
  AddButton,
  Duedate,
  Options,
  ProjectImage,
  TaskCounterCard,
  FavoriteIcon
} from "../pure/components";
import { addNewProject, deleteProject} from "../../firebase/projectController";
import {initializeProjects} from '../../App'

const ProjectList = () => {
  const { state, dispatch } = useContext(ProjectContext);
  const { projects, projectForm } = state

  console.log(projectForm)
  const categories = [
    {
      name: "Favorites",
      filter: true,
    },
    {
      name: "All Projects",
      filter: false,
    },
  ];


  function filterProjects(category) {
    if (category.filter === true) {
      const filter =
        projects && projects.filter((project) => project.favorite === true);
      return filter;
    } else {
      return projects;
    }
  }

  const addProject = async project => {
    await addNewProject(project);
    initializeProjects(dispatch)
    dispatch({
      type: 'PROJECT_FORM'
    })
  };

  const removeProject = async projectId => {
    await deleteProject(projectId)
    initializeProjects(dispatch)
  }
  
  return (
    <div className="flex flex-col p-4 gap-4">
      {projectForm ? <ProjectsForm add={addProject} /> : null}
        {categories.map((cat, index) => {
          return (
            <div key={index} className="project-content flex flex-col gap-2">
              <span className="text-2xl font-bold">{cat.name}</span>
              <div className="project-list gap-4 grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5">
                {filterProjects(cat).map((project, index) => {
                  const { id, title, description, favorite, tasks, dueDate, image } =
                    project;
                  return (
                    <div key={index} className="project-list-card  bg-primary rounded-3xl">
                      <div className="card-menu flex justify-end">
                        <Options trashHandle={() => removeProject(id)} />
                      </div>
                      <Link
                        to={`/projects/${id}`}
                        state={id}
                        className="project-link transition-opacity opacity-60 hover:opacity-100"
                      >
                        <div className="relative project-list-header bg-darkgray h-48 flex flex-col justify-end">
                          <ProjectImage img={image} />
                          <div className="p-2 font-semibold text-primary text-2xl flex justify-between items-center bg-gradient-to-b from-transparent via-darkgray to-darkgray z-20 ">
                            <span>{title[0].toUpperCase() + title.replace(title[0], '')}</span>
                            <FavoriteIcon favorite={favorite} />
                          </div>
                        </div>
                        <div className="project-list-body p-2 flex flex-col justify-between">
                          <div>
                            <p className="project-list-description">
                              {description[0].toUpperCase() + description.replace(description[0], '')}
                            </p>
                            <TaskCounterCard tasks={tasks} />
                          </div>
                          <div className="project-list-footer flex justify-between">
                            <div></div>
                            <Duedate dueDate={dueDate} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProjectList;
