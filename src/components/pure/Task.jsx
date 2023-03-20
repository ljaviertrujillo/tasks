import React, { useState } from "react";
import { classNames } from "../../models/classes.js";
import useToggle from '../../hooks/useToggle.js'

//icons
import {
  BsThreeDots,
  BsCalendarCheck,
  BsChevronCompactDown,
  BsChevronCompactUp,
} from "react-icons/bs";
import SubtaskList from "../container/SubtaskList";
import { CloseOptions, Duedate, TaskMenu } from "./components.jsx";

const Task = ({ task, projectId }) => {
  const { title, description, dueDate, status} = task;
  const [showDetails, toggleDetails] = useToggle(false);
  const [menu, toggleMenu] = useToggle(false)

  return (
    <div
      className={classNames(
        "relative task flex flex-col justify-between rounded-2xl bg-primary",
        showDetails ? "expanded" : status === 'request' ? 'bg-pending' : status === 'working' ? 'bg-working' : 'bg-done'
      )}
    >
      <div className="content">
        <div className={classNames("header p-2 rounded-t-2xl", status === 'request' ? 'bg-pending' : status === 'working' ? 'bg-working' : 'bg-done')}>
          {showDetails ? (
            <div className="flex flex-row justify-between">
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "blue" }}>
                Design
              </span>
              <CloseOptions state={menu} handle={toggleMenu} />
            </div>
          ) : null}
          <h3 className="text-xl">{title[0].toUpperCase() + title.replace(title[0],'')}</h3>
        </div>
        <div className="body p-2">
            {showDetails ? (
              <div className="info">
                <p className="text-darkgray">{description[0].toUpperCase() + description.replace(description[0],'')}</p>
                <SubtaskList projectId={projectId} task={task} />
              </div>
            ) : null}
            <div className="status flex justify-end">
            <Duedate dueDate={dueDate}/>
          </div>
        </div>
      </div>
      <button className="flex justify-center p-1 hover:bg-dark hover:bg-opacity-30 rounded-b-2xl transition-colors" onClick={toggleDetails}>
        {showDetails ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
      </button>
      {menu ? (
        <TaskMenu status={status} />
      ) : null}
    </div>
  );
};

export default Task;
