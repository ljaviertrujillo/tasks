import React, { useContext, useEffect, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { ProjectContext } from "../../Provider/ProjectProvider";
import {taskCategories} from '../../models/taskCategories.js'
import { AddButton, CloseOptions, TaskCounter } from "../pure/components";
import { addNewTask, deleteTask, taskStatus } from "../../firebase/projectController.js";
import useToggle from "../../hooks/useToggle.js";
import TaskForm from "../Form/TaskForm";
import { initializeProjects } from "../../App";
import Task from "../pure/Task";

const TaskList = () => {
  const { state, dispatch } = useContext(ProjectContext);
  const { projects, taskForm, tasksView } = state;
  const [projectFound, setProjectFound] = useState(null);
  const [tasksFound, setTasksFound] = useState(null);
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
    dispatch({
      type: 'TASK_FORM'
    })
  };

  const removeTask = async (taskId) => {
    let projectId = null
    projects.map(project => {
      const {tasks} = project
      let task = tasks.find(task => task.id === taskId)
      if(task){
        projectId = project.id
      }
    })
    await deleteTask(projectId, taskId)
    initializeProjects(dispatch)
  }

  const changeStatus = async (taskId, status) => {
    let projectId = null
    projects.map(project => {
      const {tasks} = project
      let task = tasks.find(task => task.id === taskId)
      if(task){
        projectId = project.id
      }
    })
    await taskStatus(projectId, taskId, status)
    initializeProjects(dispatch)
  }

const tasksByState = tasksFound !== null && tasksFound.reduce((acc, task) => {
  if (!acc[task.status]) {
    acc[task.status] = [];
  }
  acc[task.status].push(task);
  return acc;
}, {});

const TaskCards = ( ) => {
  return(
      <div className="gap-2 grid grid-cols-1 md:grid-cols-3">
        {taskCategories.map(cat => {
          const {id, title, status} = cat
          return(
            <div key={id} className='flex flex-col gap-2'>
              <div className="p-1.5 bg-primary rounded-full text-lg text-center cursor-default">
                {title}
              </div>
              {tasksFound !== undefined && tasksByState[status] && tasksByState[status].map(task => {
                return <Task key={task.id} task={task} remove={removeTask} changeStatus={changeStatus}/>
              })}
            </div>
          )
        })}
      </div>
  )
}

const List = () => {
  return(
    <div >
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Tag</th>
            <th>Status</th>
            <th>Due Date</th>
            {/* <th>Priority</th> */}
            {/* <th>Last Update</th> */}
          </tr>
        </thead>
        <tbody>
          {tasksFound.map(task => {
            const {title, description, tag, status, dueDate} = task
            return (
              <tr key={task.id} >
                <td>{title}</td>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{status}</td>
                <td>{dueDate}</td>
                <td>
                <CloseOptions />
                </td>
              </tr>
            )
          })}
        </tbody>

      </table>

    </div>
  )
}

  return (
    <>
      {taskForm ? <TaskForm add={addTask} /> : null}
      {tasksView === 'board' 
      ? <TaskCards />
      : tasksView === 'list' 
        ? <List />
        : tasksView === 'dashboard' 
          ? <div>Dashboard</div>
          : tasksView === 'files'
          ? <div>Files</div>
          : null}
    </>
  );
};

export default TaskList;


