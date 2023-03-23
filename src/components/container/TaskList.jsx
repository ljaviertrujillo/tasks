import React, { useContext, useEffect, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { ProjectContext } from "../../Provider/ProjectProvider";
import { addNewTask, deleteTask, taskStatus } from "../../firebase/projectController.js";
import TaskForm from "../Form/TaskForm";
import { initializeProjects } from "../../App";
import TasksBoard from "../pure/TasksBoard";
import TasksList from "../pure/TasksList";

const TaskList = () => {
  const { state, dispatch } = useContext(ProjectContext);
  const { projects, taskForm, tasksView } = state;
  const [projectFound, setProjectFound] = useState(null);
  const [tasksFound, setTasksFound] = useState(null);
  const location = useLocation();
  const projectId = location.state;
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
    task.projectId = projectId
    await addNewTask(task);
    initializeProjects(dispatch)
    dispatch({
      type: 'TASK_FORM'
    })
  };

  const removeTask = async (task) => {
    await deleteTask(task)
    initializeProjects(dispatch)
  }

  const changeStatus = async (task, status) => {
    await taskStatus(task, status)
    initializeProjects(dispatch)
  }

  return (
    <>
      {taskForm ? <TaskForm add={addTask} /> : null}
      {tasksView === 'board' 
      ? <TasksBoard tasks={tasksFound} remove={removeTask} changeStatus={changeStatus} />
      : tasksView === 'list' 
        ? <TasksList tasks={tasksFound} />
        : tasksView === 'dashboard' 
          ? <div>Dashboard</div>
          : tasksView === 'files'
          ? <div>Files</div>
          : null}
    </>
  );
};

export default TaskList;


