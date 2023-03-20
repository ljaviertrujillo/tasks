import React from "react";
import "../../styles/components.scss";
import useToggle from "../../hooks/useToggle";
useToggle;
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";

import { BsThreeDots, BsCalendarCheck, BsArrowLeftShort } from "react-icons/bs";
import {
  IoAddCircle,
  IoCloseCircle,
  IoStarOutline,
  IoStar,
} from "react-icons/io5";
import {
  VscClose,
  VscCheck,
  VscTrash,
  VscEdit,
  VscCircleLarge,
  VscCircleLargeFilled,
  VscTasklist,
} from "react-icons/vsc";
import { classNames } from "../../models/classes";
import { useLocation } from "react-router-dom";
import { taskCategories } from "../../models/taskCategories";

export const AddButton = ({ state, handle, title }) => {
  const icon = title === "New Subtask" ? "text-2xl" : "text-3xl";

  return (
    <button
      type="button"
      className={classNames(
        "flex items-center font-semibold rounded-full hover:opacity-70 hover:shadow-md transition-all text-dark",
        title === "New Project"
          ? "bg-primary gap-5 px-4 py-1 text-lg"
          : "gap-2 text-sm bg-secondary px-2 py-0.5"
      )}
      onClick={handle}
    >
      {state ? (
        <>
          {"Cancel"}
          <IoCloseCircle className={classNames(icon, "text-red")} />
        </>
      ) : (
        <>
          {title}
          <IoAddCircle className={classNames(icon, "text-blue")} />
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
  const date = new Date(dueDate);
  const month = date.toLocaleString("default", { month: "short" });
  const formattedDate = `${month}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;

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

export const SubtasksMenu = ({ subtasks, showForm, toggleForm }) => {
  const completed = subtasks.filter(
    (subtask) => subtask.completed === true
  ).length;
  const subtaskTotal = subtasks.length;

  return (
    <div className="flex justify-between items-center py-3">
      <AddButton state={showForm} handle={toggleForm} title="New Subtask" />
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
        <VscCircleLargeFilled className="true" />
      ) : (
        <VscCircleLarge className="false" />
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
              options();
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

export const CloseOptions = ({ state, handle }) => {
  return (
    <button type="button" className="text-dark text-xl" onClick={handle}>
      {state ? <VscClose /> : <BsThreeDots />}
    </button>
  );
};

export const TaskMenu = ({ status }) => {
  const [change, toggleChange] = useToggle(false)
  console.log(status)
  return (
    <ul className="absolute left-0 top-3 bg-blue h-40">
      <li>Edit</li>
      <li>Delete</li>
      <li
      className="relative bg-primary w-full"
        onMouseOver={toggleChange}
        onMouseOut={toggleChange}
        >
        Change State
        {change ? (
          <ul 
            className="absolute bg-yellow top-0"
            style={{right:'-5rem'}}
            >
            {taskCategories.map((cat) => {
              const { id, title } = cat;
              if (status !== title) {
                return <li key={id}>{title[0].toUpperCase() + title.replace(title[0], '')}</li>;
              }
            })}
          </ul>
        ): null}
        
      </li>
    </ul>
  );
};
