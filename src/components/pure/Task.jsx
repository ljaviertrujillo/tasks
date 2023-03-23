import React, { useState } from "react";
import { classNames } from "../../models/classes.js";
import useToggle from '../../hooks/useToggle.js'

//icons
import {
  BsChevronCompactDown,
  BsChevronCompactUp,
} from "react-icons/bs";
import SubtaskList from "../container/SubtaskList";
import { CloseOptions, Duedate, Tag, TaskMenu } from "./components.jsx";

const Task = ({ task, remove, changeStatus }) => {
  const {title, dueDate, status, priority} = task;
  const [detail, setDetail] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  function handleDetails (){
    setDetail(!detail)
    setShowMenu(false)
  }
  
  return (
    <div
      className={classNames(
        "relative task flex flex-col justify-between rounded-2xl ",
        detail ? "expanded bg-primary" : status === 'inqueue' ? 'bg-inqueue' : status === 'inprocess' ? 'bg-inprocess' : 'bg-done'
      )}
    >
      <div className={showMenu ? 'rounded-2xl opacity-10' : null}>
        <div className={classNames("header p-2 rounded-t-2xl", status === 'inqueue' ? 'bg-inqueue' : status === 'inprocess' ? 'bg-inprocess' : 'bg-done')}>
          {detail ? (
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <Tag title={'Design'} bg={'blue'} color={'lightgray'} />
                <Tag title={priority.toUpperCase()} bg={priority === 'low' ? 'blue' : priority === 'medium' ? 'yellow': 'red'} color={'primary'} priority={priority} />
              </div>
              
                <CloseOptions state={showMenu} handle={() => setShowMenu(true)} />
              
            </div>
          ) : null}
          <h3 className="text-xl">{title[0].toUpperCase() + title.replace(title[0],'')}</h3>
        </div>
        <div className="body p-2">
            {detail ? (
              <div className="info">
                <SubtaskList task={task} />
              </div>
            ) : null}
            <div className="status flex justify-end">
            <Duedate dueDate={dueDate}/>
          </div>
        </div>
      </div>
      <button type="button" className="flex justify-center p-1 hover:bg-dark hover:bg-opacity-30 rounded-b-2xl transition-colors" onClick={() => handleDetails()}>
        {detail ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
      </button>
      {showMenu ? (
        <TaskMenu taskStatus={status} task={task} changeStatus={changeStatus} remove={remove} setShowMenu={setShowMenu}  />
      ) : null}
    </div>
  );
};

export default Task;
