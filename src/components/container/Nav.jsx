import React, { useContext, useEffect } from 'react'
import { useLocation, useMatch } from 'react-router-dom'
import { features, settings } from '../../router'
import { AddButton, BackButton, User } from '../pure/components'
import { BsCalendar3, BsBell } from 'react-icons/bs'
import CompletedBar from '../pure/CompletedBar'

import { ProjectContext } from '../../Provider/ProjectProvider'

export const resetForms = (dispatch) => {
  dispatch({
    type: 'RESET_FORMS'
  })
}

const Nav = () => {
  const { state, dispatch } = useContext(ProjectContext) 
  const { projectForm, taskForm, memberForm } = state
  const location = useLocation()
  const labelPage = features.find(feature => feature.url === location.pathname) || settings.find(setting => setting.url === location.pathname)
  const mathRoute = useMatch('projects/:id')

  const showProjectForm = () => {
    dispatch({
      type: 'PROJECT_FORM'
    })
  }
  
  const showTaskForm = () => {
    dispatch({
      type: 'TASK_FORM'
    })
  }
  
  const showMemberForm = () => {
    dispatch({
      type: 'MEMBER_FORM'
    })
  }

  useEffect(()=>{
    resetForms(dispatch)
  }, [location])

  return (
    <nav className='fixed left-20 right-0 top-0 bg-secondary  flex flex-row justify-between items-center px-4 h-16 z-10'>
      <section className='text-2xl font-semibold'>
        {mathRoute === null ? labelPage.label : <BackButton /> }
      </section>
      {mathRoute !== null ? (
        <CompletedBar />
      ): null}
      <section className='flex flex-row gap-6 text-xl items-center'>
        <BsCalendar3 />
        <BsBell />
        <User type={'large'} />
        {location.pathname === '/projects' ? (
          <AddButton state={projectForm} handle={showProjectForm} title={'New Project'} type={'large'} />
        ) : location.pathname === '/team' ? (
          <AddButton state={memberForm} handle={showMemberForm} title={'Add Member'} type={'large'} />
          ) : mathRoute !== null 
            ? <AddButton state={taskForm} handle={showTaskForm} title={'New Task'} type={'large'} /> 
            : null 
        }
      </section>
    </nav>
  )
}

export default Nav
