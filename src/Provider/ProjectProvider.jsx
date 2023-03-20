import React, { createContext, useReducer, useEffect } from 'react'
import { getProjects } from '../firebase/projectController';
import reducer from '../reducer/reducer';

export const ProjectContext = createContext();

const ProjectContextProvider = ({children}) => {

  const initialState = {
    loading: true,
    projects : [],
    error: null
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProjectContext.Provider value={{state, dispatch }}>
        {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContextProvider
