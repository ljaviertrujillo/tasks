import React from 'react'
import { Outlet } from 'react-router-dom'
import ProjectList from '../components/container/ProjectList'
import { useLocation} from "react-router-dom";
import ProjectsForm from '../components/Form/ProjectsForm';
import useToggle from '../hooks/useToggle';
import { AddButton } from '../components/pure/components';
useToggle

const Projects = () => {
  const location = useLocation()


  return (
    <>
    {location.pathname !== '/projects' ? null 
    : <ProjectList />
    }
      <Outlet />
    </>
  )
}

export default Projects