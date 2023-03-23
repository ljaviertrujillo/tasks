import React, { createContext, useReducer } from 'react'
import reducer from '../reducer/reducer';

export const ProjectContext = createContext();

const ProjectContextProvider = ({children}) => {

  const initialState = {
    loading: true,
    projects : [],
    error: null,
    projectForm: false,
    taskForm: false,
    subtaskForm: false,
    memberForm: false,
    tasksView: 'board',
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProjectContext.Provider value={{state, dispatch }}>
        {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContextProvider
