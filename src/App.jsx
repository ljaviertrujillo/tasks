import React, {useContext, useEffect} from 'react'
import { getProjects } from './firebase/projectController';
import { router } from './router';
import { RouterProvider } from 'react-router-dom'
import { ProjectContext } from "./Provider/ProjectProvider";

export const initializeProjects = async (dispatch) => {
  try {
    const projectsData = await getProjects();
    const projects = projectsData.map(project => ({
      ...project,
      tasks: project.tasks.map(task => ({
        ...task,
        subtasks: task.subtasks.map(subtask => ({
          ...subtask
        }))
      }))
    }))
    dispatch({
      type: 'GET_PROJECTS',
      payload: projects
    })
  } catch (error) {
    dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  }
}

const App = () => {
  const {dispatch} = useContext(ProjectContext);

  useEffect (() => {
    initializeProjects(dispatch);
  }, [])

  return (
      <RouterProvider router={router} />
  )
}

export default App
