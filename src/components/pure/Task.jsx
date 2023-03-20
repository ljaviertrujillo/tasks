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
import { Duedate } from "./components.jsx";

const Task = ({ task, projectId }) => {
  const { title, description, dueDate, status} = task;
  const [showDetails, toggleDetails] = useToggle(false);
  
 const taskBgColor = (status) => {
  switch (status) {
    case 'request':
      return {
        backgroundColor: '#FD7D7C'
      }
    case 'working':
      return {
        backgroundColor: '#F3D088'
      }
    case 'done':
      return {
        backgroundColor: '#81B38D'
      }
  
    default:
      return {
        backgroundColor: '#FD7D7C'
      }
  }
 }

  return (
    <div
      className={classNames(
        "task d-flex flex-column justify-content-betweem",
        showDetails ? "expanded" : null
      )}
      style={showDetails ? null : taskBgColor(status)}
    >
      <div className="content">
        <div className="header">
          {showDetails ? (
            <div className="d-flex flex-row justify-content-between">
              <span className="tag" style={{ backgroundColor: "blue" }}>
                Design
              </span>
              <BsThreeDots />
            </div>
          ) : null}
          <h3 className="title">{title}</h3>
        </div>
        <div className="body">
            {showDetails ? (
              <div className="info">
                <p>{description}</p>
                <SubtaskList projectId={projectId} task={task} />
              </div>
            ) : null}
            <div className="status d-flex justify-content-end">
            <Duedate dueDate={dueDate}/>
          </div>
        </div>
      </div>
      <button onClick={toggleDetails}>
        {showDetails ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
      </button>
    </div>
  );
};

export default Task;
