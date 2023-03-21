import React, { useContext } from 'react'
import { getProjects } from '../firebase/projectController'
import SideBarMenu from '../components/container/SideBarMenu'
import { Outlet } from 'react-router-dom'
import Nav from '../components/container/Nav'
import Footer from './Footer'

import { ProjectContext } from '../Provider/ProjectProvider'


const LayoutPrivate = () => {
  const { dispatch } = useContext(ProjectContext)

  return (
    <>
      <SideBarMenu />
      <main className='absolute left-20 right-0 px-4 pt-16 flex flex-col bg-secondary h-screen'>
       <Nav />
       <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default LayoutPrivate
