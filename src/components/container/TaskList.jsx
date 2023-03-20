import React, { useContext, useEffect, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { ProjectContext } from "../../Provider/ProjectProvider";
import {taskCategories} from '../../models/taskCategories.js'
import { AddButton, TaskCounter } from "../pure/components";
import { addNewTask } from "../../firebase/projectController.js";
import useToggle from "../../hooks/useToggle.js";
import TaskForm from "../Form/TaskForm";
import { initializeProjects } from "../../App";
import Task from "../pure/Task";

const TaskList = () => {
  const { state, dispatch } = useContext(ProjectContext);
  const { projects } = state;
  const [projectFound, setProjectFound] = useState(null);
  const [tasksFound, setTasksFound] = useState(null);
  const [showForm, toggleForm] = useToggle(false);
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];
  const tasksMatch = useMatch("/tasks");
  const isProjectMatch = useMatch('projects/:id') !==null

  useEffect(() => {
    if (tasksMatch !== null && tasksMatch.pathname) {
      const allTasks = projects.flatMap((project) => project.tasks);
      setTasksFound(allTasks);
    } else if(isProjectMatch){
      if (projects.length > 0) {
        const isValidProject = projects.some(
          (project) => project.id === projectId);
        if (isValidProject) {
          const project = projects.find((project) => project.id === projectId);
          setProjectFound(project);
          const {tasks} = project
          setTasksFound(tasks);
        }
      }
    }
  }, [projects, projectId, tasksMatch, isProjectMatch]);

  const addTask = async (task) => {
    await addNewTask(projectId, task);
    initializeProjects(dispatch)
    toggleForm();
  };

  // TODO: Remove Task

const tasksByState = tasksFound !== null && tasksFound.reduce((acc, task) => {
  if (!acc[task.status]) {
    acc[task.status] = [];
  }
  acc[task.status].push(task);
  return acc;
}, {});

  return (
    <div className="gap-2 grid grid-cols-1 md:grid-cols-3 p-2">
      {taskCategories.map(cat => {
        const {id, title, hasButton} = cat
        return(
          <div key={id} className='flex flex-col gap-2'>
            <div className="p-3 flex flex-row justify-between items-center bg-primary rounded-2xl">
              <div className="flex flex-col text-xl">
                {title.toUpperCase()}
                {tasksFound !== null 
                  ? (<TaskCounter tasks={tasksFound} status={title} />
                  ): (<TaskCounter tasks={[]} status={title} />)}
              </div>
              {isProjectMatch ? hasButton ? <AddButton state={showForm} handle={toggleForm} title='New Task' /> : null : null}
            </div>
            {isProjectMatch && hasButton && showForm ? <TaskForm add={addTask} /> : null}
            {tasksFound !== undefined && tasksByState[title] && tasksByState[title].map(task => {
              return <Task key={task.id} task={task} projectId={projectId} />
            })}
          </div>
        )
      })}
    </div>
  );
};

export default TaskList;
