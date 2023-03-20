import React from 'react'
import { getProjects } from '../firebase/projectController'
import SideBarMenu from '../components/container/SideBarMenu'
import { Outlet } from 'react-router-dom'
import Nav from '../components/container/Nav'
import Footer from './Footer'


const LayoutPrivate = () => {

  return (
    <>
      <SideBarMenu />
      <main className='flex flex-col bg-secondary'>
       <Nav />
        <section className='absolute top-16 left-20 right-0 bg-secondary'>
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LayoutPrivate
