import React from 'react'
import { useLocation, useMatch } from 'react-router-dom'
import { features } from '../../router'
import { BackButton } from '../pure/components'
import { BsCalendar3, BsBell } from 'react-icons/bs'
import { classNames } from '../../models/classes'
import CompletedBar from '../pure/CompletedBar'

const Nav = () => {
    const location = useLocation()
    const labelPage = features.find(feature => feature.url === location.pathname)
    const mathRoute = useMatch('projects/:id')
    const projectId = location.pathname.split('/')[2]

  return (
    <nav className='fixed left-20 right-0 top-0 bg-secondary  flex flex-row justify-between items-center px-6 h-16 z-10'>
      <section className='text-2xl font-semibold'>
        {mathRoute === null ? labelPage.label : <BackButton /> }
      </section>
      {mathRoute !== null ? (
        <CompletedBar />
      ): null}

      
      <section className='flex flex-row gap-4 text-xl'>
        <BsCalendar3 />
        <BsBell />
        
      </section>
    </nav>
  )
}

export default Nav
