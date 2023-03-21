import React, { useState } from "react";
import { classNames } from "../../models/classes.js";
import useToggle from '../../hooks/useToggle.js'

//icons
import {
  BsChevronCompactDown,
  BsChevronCompactUp,
} from "react-icons/bs";
import SubtaskList from "../container/SubtaskList";
import { CloseOptions, Duedate, TaskMenu } from "./components.jsx";

const Task = ({ task, remove, changeStatus }) => {
  const {id, title, description, dueDate, status, priority} = task;
  const [detail, setDetail] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  function handleDetails (){
    setDetail(!detail)
    setShowMenu(false)
  }

  console.log(detail)
  

  return (
    <div
      className={classNames(
        "relative task flex flex-col justify-between rounded-2xl",
        detail ? "expanded bg-primary" : status === 'inqueue' ? 'bg-request' : status === 'inprocess' ? 'bg-working' : 'bg-done'
      )}
    >
      <div className="content">
        <div className={classNames("header p-2 rounded-t-2xl", status === 'inqueue' ? 'bg-request' : status === 'inprocess' ? 'bg-working' : 'bg-done')}>
          {detail ? (
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "blue" }}>
                  Design
                </span>
                <span className={classNames('flex items-center text-xs px-4 py-0.5 rounded-full', priority === 'low' ? 'bg-blue' : priority === 'medium' ? 'bg-yellow': 'bg-red')}>
                  {priority.toUpperCase()}
                </span>
              </div>
              
                <CloseOptions state={showMenu} handle={() => setShowMenu(!showMenu)} />
              
            </div>
          ) : null}
          <h3 className="text-xl">{title[0].toUpperCase() + title.replace(title[0],'')}</h3>
        </div>
        <div className="body p-2">
            {detail ? (
              <div className="info">
                <p className="text-darkgray">{description[0].toUpperCase() + description.replace(description[0],'')}</p>
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
        <TaskMenu taskStatus={status} taskId={id} changeStatus={changeStatus} remove={remove} setShowMenu={setShowMenu}  />
      ) : null}
    </div>
  );
};

export default Task;
