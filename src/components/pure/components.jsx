import React from 'react'
import '../../styles/components.scss'
import useToggle from '../../hooks/useToggle';
useToggle
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

import { BsChevronCompactDown, BsChevronCompactUp, BsCalendarCheck, BsImage, BsArrowLeftShort } from "react-icons/bs";
import {
  IoAddCircle,
  IoCloseCircle,
  IoStarOutline,
  IoStar,
} from "react-icons/io5";
import { VscClose, VscCheck, VscTrash, VscEdit, VscCircleLarge, VscCircleLargeFilled, VscTasklist } from 'react-icons/vsc'
import { classNames } from '../../models/classes';

export const AddButton = ({state, handle, title}) => {
  const icon = 'text-3xl'
  return (
    <button
        type='button'
        className='flex justify-between items-center font-semibold gap-3 add-button bg-primary px-4 py-2 rounded-full hover:opacity-70 hover:shadow-md transition-all'
        onClick={handle}>
      {state 
        ? (
          <>
          {'Cancel'}
          <IoCloseCircle className={classNames(icon, 'text-red')}/>
          </>
        ) : (
          <>
          {title} 
          <IoAddCircle className={classNames(icon, 'text-blue')}/>
          </>
        )}
    </button>
  )
}

export const FavoriteButton = ({ handle, fav}) => {
  return (
    <button
        type="button"
        className="favorite-btn"
        onClick={handle}
    >
        <FavoriteIcon favorite={fav} />
    </button>
  )
}

export const FavoriteIcon = ({favorite}) => {
  return (
    <>
      {favorite ? (
        <IoStar size={40} className="text-yellow" />
      ) : (
        <IoStarOutline size={40} className='text-yellow'/>
      )}
    </>
  )
}

export const Duedate = ({dueDate}) => {
  const date = new Date(dueDate);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;
  return(
    <div className="duedate flex items-center gap-2 text-lg">
      <BsCalendarCheck className='icon'/>
      {dueDate}
    </div>
  )
}



export const TaskCounter = ({status, tasks}) => {
  const tasksLength = tasks.filter(task => task.status === status).length

  return(
    <span className='text-sm'>
        {tasksLength === 0 ? 'NO ' : (tasksLength + ' ')}CARD{tasksLength > 1 || tasksLength === 0 ? 'S' : null}
    </span>
  )
}

export const SubtasksMenu = ({subtasks, showForm, toggleForm}) => {
  const completed = subtasks.filter(subtask => subtask.completed === true).length
  const subtaskTotal = subtasks.length
  
  return (
    <div className='flex justify-between items-center'>
      <AddButton state={showForm} handle={toggleForm} title='New Subtask' />
      <div className='subtask-counter'>
        {(subtaskTotal) === 0 ? null : (completed + ' / ' + subtaskTotal)}
        <VscTasklist 
          className='subtask-icon'
          style={{color: subtaskTotal === 0 ? '#949499' : completed === subtaskTotal ? '#01AD93' : '#F2AA1F'}}
          />
      </div>
    </div>
  )
}

export const SubtaskCompleted = ({completed, handle}) => {
  return (
    <button
      type='button'
      className='completed-btn'
      onClick={handle}>
      {completed 
        ? <VscCircleLargeFilled className='true'/>
        : <VscCircleLarge className='false'/>
      }
    </button>
  )
}

export const Options = ({ trashHandle, editHandle}) => {
  const [trash, toggleTrash] = useToggle(false)
  const [edit, toggleEdit] = useToggle(false)

  const icon = 'cursor-pointer text-2xl font-bold text-darkgray transition-all '

  return (
    <div className='p-2 flex items-center gap-2'>
      {trash ? null : edit 
        ?(
          <>
            <VscCheck className={classNames(icon, 'hover:text-blue')} />
            <VscClose onClick={toggleEdit} className={classNames(icon, 'hover:text-red')} />
          </>
        ): (
          <>
            <VscEdit onClick={toggleEdit} className={classNames(icon, 'hover:text-blue')}/>
          </>
        )
      }
      {edit ? null : trash 
        ?(
          <>
            <VscCheck onClick={() => {trashHandle(); toggleTrash()}} className={classNames(icon, 'hover:text-blue')} />
            <VscClose onClick={toggleTrash} className={classNames(icon, 'hover:text-red')} />
          </>
        ): (
          <>
            <VscTrash onClick={toggleTrash} className={classNames(icon, 'hover:text-red')} />
          </>
        )
      }
    </div>
  )
}

export const TaskCounterCard = ({tasks}) => {
  ChartJS.register(ArcElement);
  const taskTotal = tasks.length !== 0 ? tasks.length : 1
  const taskDone = tasks.length !== 0 ? tasks.filter(task => task.status === 'done') : 0
  const taskPending = taskTotal - taskDone
  const percentage = tasks.length !== 0 ? Math.round(taskDone/taskTotal*100) : 0
  const data = {
    labels: ["Completed"],
    datasets: [
      {
        data: [taskDone, taskPending],
        backgroundColor: [ '#01AD93', '#d1d2d4', ],
        borderColor: 'transparent',
      },
    ],
  };

  const options = {
    cutout: '70%',
    circumference: 270,
    rotation: 270,
  }

  return (
    <div className='tasks-counter-card flex flex-row justify-between items-center my-2'>
      <span className='font-semibold'>PROGRESS</span>
      <div className='task-graph h-16 relative'>
        <span className='percentage absolute bottom-0 py-1 font-bold' style={{color: percentage === 100 ? '#01AD93' : '#949599' }}>{percentage + '%'} </span>
        <Doughnut data={data} options={options}/>
      </div>
    </div>
  )
}

export const ProjectImage = ({img}) => {
  const noImg = './public/no-img.png'
  return(
    <div className={"absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center"} style={{backgroundImage: img !== '' ? `url(${img})` : `url(${noImg})` }}>
    </div>
  )
}

export const BackButton = () => {
  return (
    <Link to={'/projects'} className='bg-darkgray text-lg py-1 px-4 rounded-lg opacity-60 flex items-center transition-opacity hover:opacity-100'>
      <BsArrowLeftShort className=''/>
      Back
    </Link>
  )
}