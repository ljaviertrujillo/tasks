import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'; 
import { classNames } from '../../models/classes';
import  { ProjectContext } from '../../Provider/ProjectProvider';

const CompletedBar = ({id}) => {
  const location = useLocation()
    const { state } = useContext(ProjectContext)
    const {projects} = state
    const projectId = location.pathname.split('/')[2]
    const project = state.projects.find(project => project.id === projectId)
    // const completedTasks = tasks.filter(task => task.status === 'done')
    // const totalTasks = tasks.length
    // const percentageCompleted = totalTasks !== 0 ? (completedTasks/totalTasks) : 0

  return (
    <>
        <section className='flex items-center justify-between' style={{width:'34vw'}}>
            {/* <span className={classNames('font-semibold', percentageCompleted === 0 ? 'text-darkgray' : 'text-blue')}>{percentageCompleted + '%'}</span>
            <div className='relative h-1.5 items-center' style={{width: '30vw'}}>
                <div className='absolute left-0 h-1.5 bg-darkgray rounded-full' style={{width: '30vw'}} ></div>
                <div className='absolute left-0 h-1.5 bg-blue rounded-full' style={{width:percentageCompleted*.3.toString() + 'vw'}} ></div>
            </div> */}
        </section>
    </>
  )
}

export default CompletedBar
