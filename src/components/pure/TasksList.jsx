import React, {useContext} from 'react'
import dayjs from 'dayjs'
import { CloseOptions, Tag, User } from './components'
import { ProjectContext } from '../../Provider/ProjectProvider'

const TasksList = ({tasks}) => {
  const {state} = useContext(ProjectContext)
  const {projects} = state
  const rowHeadStyle = 'py-3 text-darkgray'
  const rowBodyStyle = 'py-3 flex items-center'

  const formatDate = date => {
    return date = dayjs(date).format('MMM/DD/YY')
  }

  const lastUpdateTag = dateString => {
    const today = dayjs()
    const date = dayjs(dateString, 'MM/DD/YYYY')
    const diffDays = today.diff(date, 'day')
    const diffWeeks = today.diff(date, 'week')
    const diffMonths = today.diff(date, 'month')
    const diffYears = today.diff(date, 'year')

     switch(true){
      case date.isSame(today, 'day'):
        return 'Today';
      case date.isSame(today.subtract(1, 'day'), 'day'):
        return 'Yesterday';
      case diffDays >=2 && diffDays <= 7:
        return `${diffDays} days ago`;
      case diffWeeks > 0 && diffWeeks < 5:
        return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
      case diffMonths > 0 && diffMonths < 12:
        return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
      case diffYears > 0:
        return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`
      default:
        return formatDate(dateString)
     }
  }

  return (
    <div className='p-2 bg-primary rounded-xl'>
      {tasks && tasks.length > 0 ? (
        <table className='table-auto w-full'>
        <thead>
          <tr className={'text-left'}>
            <th className={rowHeadStyle}>Priority</th>
            <th className={rowHeadStyle}>Task</th>
            <th className={rowHeadStyle}>Assigned to</th>
            <th className={rowHeadStyle}>Tag</th>
            <th className={rowHeadStyle}>Project</th>
            <th className={rowHeadStyle}>Status</th>
            <th className={rowHeadStyle}>Due Date</th>
            <th className={rowHeadStyle}>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            const {title, tag, projectId, status, priority, lastUpdate, dueDate} = task
            const projectTitle = projects.find(project => project.id === projectId).title
            
            return (
              <tr key={task.id} className='hover:bg-secondary transitions-all rounded-xl'>
                <td  className='flex items-center py-3'><Tag title={priority.toUpperCase()} bg={priority === 'low' ? 'blue' : priority === 'medium' ? 'inprocess' : 'inqueue'} color={'primary'} priority={priority} /></td>
                <td className='py-3'>{title}</td>
                <td><User type={'small'} /></td>
                <td className='flex items-center py-3'><Tag title={'Design'} bg={'blue'} color={'secondary'} /></td>
                <td>{projectTitle}</td>
                <td className='flex items-center py-3'><Tag title={status === 'inqueue' ? 'In Queue' : status === 'inprocess' ? 'In Process' : 'Done'} bg={status} color={'primary'} /></td>
                <td>{formatDate(dueDate)}</td>
                <td>{lastUpdateTag(lastUpdate)}</td>
                <td>
                <CloseOptions />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      ) : 
        <span className='text-center text-darkgray text-lg font-semibold'>
            No Task Found
        </span>
      }
      
    </div>
  )
}

export default TasksList
