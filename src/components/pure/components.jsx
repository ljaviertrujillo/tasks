import React from "react";
import useToggle from "../../hooks/useToggle";
useToggle;
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";

import { BsThreeDots, BsCalendarCheck, BsArrowLeftShort, BsCircle, BsCheck2Circle } from "react-icons/bs";
import {
  IoStarOutline,
  IoStar,
} from "react-icons/io5";
import {
  VscAdd,
  VscClose,
  VscCheck,
  VscTrash,
  VscEdit,
  VscTasklist,
} from "react-icons/vsc";
import {FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc'

import { classNames } from "../../models/classes";
import { taskCategories } from "../../models/taskCategories";
import dayjs from "dayjs";

export const AddButton = ({ state, handle, title, type }) => {

  return (
    <button
      type="button"
      className={classNames(
        "flex items-center justify-between font-semibold rounded-md hover:opacity-70 hover:shadow-md transition-all text-primary bg-buttonPrimary",
        type === "large"
          ? "w-40 py-1.5 px-4 text-lg"
          : "w-32 py-1 px-2 text-sm "
      )}
      onClick={handle}
    >
      {state ? (
        <>
          <VscClose />
          {"Close Form"}
        </>
      ) : (
        <>
          <VscAdd />
          {title}
        </>
      )}
    </button>
  );
};

export const FavoriteButton = ({ handle, fav }) => {
  return (
    <button type="button" onClick={handle}>
      <FavoriteIcon favorite={fav} />
    </button>
  );
};

export const FavoriteIcon = ({ favorite }) => {
  return (
    <>
      {favorite ? (
        <IoStar size={32} className="text-yellow" />
      ) : (
        <IoStarOutline size={32} className="text-yellow" />
      )}
    </>
  );
};

export const Duedate = ({ dueDate }) => {
  const formattedDate = dayjs(dueDate).format('MMM/DD/YY')

  return (
    <div className="flex items-center gap-2 text-md cursor-default">
      <BsCalendarCheck className="text-dark icon" />
      <span className="text-dark cursor-default font-semibold">
        {formattedDate}
      </span>
    </div>
  );
};

export const TaskCounter = ({ status, tasks }) => {
  const tasksLength = tasks.filter((task) => task.status === status).length;

  return (
    <span className="text-xs text-darkgray font-semibold">
      {tasksLength === 0 ? "NO " : tasksLength + " "}CARD
      {tasksLength > 1 || tasksLength === 0 ? "S" : null}
    </span>
  );
};

export const SubtasksMenu = ({ subtasks, subtaskForm, showSubtaskForm }) => {
  const completed = subtasks.filter(
    (subtask) => subtask.completed === true
  ).length;
  const subtaskTotal = subtasks.length;

  return (
    <div className="flex justify-between items-center py-3">
      <AddButton state={subtaskForm} handle={showSubtaskForm} title={"Add Subtask"} type={'small'} />
      <div className="flex gap-2 items-center">
        <span className="text-dark cursor-default">
          {subtaskTotal === 0 ? null : completed + " / " + subtaskTotal}
        </span>
        <VscTasklist
          className={classNames(
            subtaskTotal === 0
              ? "text-dark"
              : completed === subtaskTotal
              ? "text-done"
              : "text-yellow"
          )}
          size={26}
        />
      </div>
    </div>
  );
};

export const SubtaskCompleted = ({ completed, handle }) => {
  return (
    <button
      type="button"
      className={classNames(completed ? "text-done" : "text-darkgray")}
      onClick={handle}
    >
      {completed ? (
        <BsCheck2Circle className="true" />
      ) : (
        <BsCircle className="false" />
      )}
    </button>
  );
};

export const Options = ({ trashHandle, editHandle, options }) => {
  const [trash, toggleTrash] = useToggle(false);
  const [edit, toggleEdit] = useToggle(false);

  const icon = "cursor-pointer text-xl font-bold text-darkgray transition-all ";

  return (
    <div className="p-2 flex items-center gap-2">
      {trash ? null : edit ? (
        <>
          <VscCheck className={classNames(icon, "hover:text-blue")} />
          <VscClose
            onClick={toggleEdit}
            className={classNames(icon, "hover:text-red")}
          />
        </>
      ) : (
        <>
          <VscEdit
            onClick={toggleEdit}
            className={classNames(icon, "hover:text-blue")}
          />
        </>
      )}
      {edit ? null : trash ? (
        <>
          <VscCheck
            onClick={() => {
              trashHandle();
              toggleTrash();
            }}
            className={classNames(icon, "hover:text-blue")}
          />
          <VscClose
            onClick={toggleTrash}
            className={classNames(icon, "hover:text-red")}
          />
        </>
      ) : (
        <>
          <VscTrash
            onClick={toggleTrash}
            className={classNames(icon, "hover:text-red")}
          />
        </>
      )}
    </div>
  );
};

export const TaskCounterCard = ({ tasks }) => {
  ChartJS.register(ArcElement);
  const taskTotal = tasks.length !== 0 ? tasks.length : 1;
  const taskDone =
    tasks.length !== 0 ? tasks.filter((task) => task.status === "done") : 0;
  const taskPending = taskTotal - taskDone;
  const percentage =
    tasks.length !== 0 ? Math.round((taskDone / taskTotal) * 100) : 0;
  const data = {
    labels: ["Completed"],
    datasets: [
      {
        data: [taskDone, taskPending],
        backgroundColor: ["#01AD93", "#d1d2d4"],
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    cutout: "70%",
    circumference: 270,
    rotation: 270,
  };

  return (
    <div className="tasks-counter-card flex flex-row justify-between items-center my-2">
      <span className="font-semibold">PROGRESS</span>
      <div className="task-graph h-16 relative">
        <span
          className="percentage absolute bottom-0 py-1 font-bold"
          style={{ color: percentage === 100 ? "#01AD93" : "#949599" }}
        >
          {percentage + "%"}{" "}
        </span>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export const ProjectImage = ({ img }) => {
  const noImg = "./public/no-img.png";
  return (
    <div
      className={
        "absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center"
      }
      style={{ backgroundImage: img !== "" ? `url(${img})` : `url(${noImg})` }}
    ></div>
  );
};

export const BackButton = () => {
  return (
    <Link
      to={"/projects"}
      className="gap-2 bg-darkgray text-dark text text-lg px-4 rounded-full opacity-60 flex items-center transition-opacity hover:opacity-100"
    >
      <BsArrowLeftShort className="" />
      Back
    </Link>
  );
};

export const CloseOptions = ({ handle }) => {
  return (
    <button type="button" className="text-dark text-2xl" onClick={handle}>
      <BsThreeDots />
    </button>
  );
};

export const TaskMenu = ({ task, remove, changeStatus, setShowMenu }) => {

  const buttonStyle='flex w-full gap-3 items-center my-1 justify-end'
  const listStyle = 'my-2 text-darkgray hover:text-dark transition-colors text-xl justify-end '

  const [change, toggleChange] = useToggle(false)
  return (
    <nav className="absolute w-44 top-4 p-2 right-10 -mx-2 bg-secondary z-10 rounded-lg">
    <button
      type="button"
      onClick={() => setShowMenu(false)}
      className={classNames(buttonStyle, 'text-darkgray hover:text-buttonPrimary transition-colors')}
    >
      <VscClose size={26}/>
    </button>
      <ul>
        <li className={listStyle}>
          <button type="button" className={buttonStyle}>
            Edit<VscEdit />
          </button>
        </li>
        <li className={listStyle}>
          <button 
            type="button" 
            className={buttonStyle}
            onClick={() => {remove(task); setShowMenu(false)}}
          >
             Delete<VscTrash/>
          </button>
        </li>
        <li
          className={classNames("relative flex items-center gap-3 cursor-default", listStyle)}
          onMouseOver={toggleChange}
          onMouseOut={toggleChange}
          >
           Change State<BsCircle />
          
          {change ? (
            <ul 
              className="absolute rounded-lg w-36 -top-9 -left-36 bg-secondary "
              >
              {taskCategories.map((cat) => {
                const { id, status, title } = cat;
                const statusStyle = `text-${status}`
                if (task.status !== status) {
                  return (
                    <li key={id} className={listStyle}>
                      <button 
                        type="button" 
                        className={classNames(buttonStyle, 'pl-4')}
                        onClick={() => {changeStatus(task, status); setShowMenu(false) }}
                        >
                          {title}
                          <BsCircle className={statusStyle}/>
                        </button>
                    </li>);
                }
              })}
            </ul>
          ) : null}
        </li>
      </ul>
    </nav>
  );
};

export const User = ({type}) => {
  return(
    <button type="button" className="flex items-center gap-3">
      <div className={classNames("flex items-center justify-center rounded-full bg-darkgray", type === 'large' ? 'h-12 w-12' : 'w-8 h-8')}>J</div>
      {type !== 'large' ? (
        <span>Javier Trujillo</span>
      ) : null}
    </button>
  )
}

export const Tag = ({title, bg, color, priority}) => {
  return (
    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-${bg} text-${color}`}>
    {priority === 'low' 
      ? <FcLowPriority size={16} />  
      : priority === 'medium'
        ? <FcMediumPriority size={16} />
        : priority === 'high'
          ? <FcHighPriority size={16} />
          : null}
    {title}
  </span>
  )

}