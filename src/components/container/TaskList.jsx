import React, { useContext, useEffect } from "react";
import { ProjectContext } from "../../Provider/ProjectProvider";
import { addNewTask } from "../../firebase/projectController.js";
import useToggle from "../../hooks/useToggle.js";
import { initializeProjects } from "../../App";
// import "../../styles/task.scss";

// import Task from "../pure/Task";
import { useLocation, useMatch } from "react-router-dom";
// import TaskForm from "../Form/TaskForm";
// import { classNames } from "../../models/classes.js";
// import { TaskCounter, AddButton } from "../components/pure/components";

const TaskList = () => {
  const [showTaskForm, toggleTaskForm] = useToggle(false);
  const location = useLocation();
  const { state, dispatch } = useContext(ProjectContext);
  const mathRoute = useMatch('projects/:id')

  function tasksFilter(status) {
    const taskList = tasks.filter((task) => task.status === status);
    return taskList.map((task, index) => {
      return <Task key={index} task={task} projectId={projectId} />;
    });
  }

  const addTask = async (task) => {
    const projectId = project.id;
    await addNewTask(projectId, task);
    initializeProjects(dispatch)
    toggleTaskForm();
  };

  // TODO: Remove Task

  return (
    <div className="tasks gap-2 grid grid-cols-1 md:grid-cols-3 p-2">
      {/* {taskCategories.map((cat) => {
        const { id, title, hasButton } = cat;
        return (
          <div key={id} className="flex flex-col gap-2">
            <div className="task-title p-3 flex flex-row justify-between items-center bg-primary rounded-3xl">
              <div className="status flex flex-col text-xl">
                {title.toLocaleUpperCase()}
                <TaskCounter tasks={[]} status={title} />
              </div>
              {location.pathname !== "/tasks" ? null : hasButton ? (
                <AddButton
                  state={showTaskForm}
                  handle={toggleTaskForm}
                  title="New Task"
                />
              ) : null}
            </div>
            {hasButton ? showTaskForm ? <TaskForm /> : null : null}
          </div>
        );
      })} */}
      Hola
    </div>
  );
};

export default TaskList;
