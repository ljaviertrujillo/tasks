import React from "react";
import Task from "./Task";
import { taskCategories } from "../../models/taskCategories";

const TasksBoard = ({ tasks, remove, changeStatus }) => {
  const tasksByState =
    tasks !== null &&
    tasks.reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    }, {});
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {tasks !== null && tasks.length > 0 ? (
        taskCategories.map((cat) => {
          const { id, title, status } = cat;
          return (
            <div key={id} className="flex flex-col gap-2">
              <div className="p-1.5 bg-primary rounded-full text-xl font-semibold text-center cursor-default">
                {title}
              </div>
              {tasks &&
              tasksByState[status] &&
              tasksByState[status].length > 0 ? (
                tasks &&
                tasksByState[status] &&
                tasksByState[status].map((task) => {
                  return (
                    <Task
                      key={task.id}
                      task={task}
                      remove={remove}
                      changeStatus={changeStatus}
                    />
                  );
                })
              ) : (
                <span className="text-center text-darkgray text-md font-semibold">No tasks</span>
              )}
            </div>
          );
        })
      ) : (
        <span className="text-center text-darkgray text-lg font-semibold">
          No Task Found
        </span>
      )}
    </div>
  );
};

export default TasksBoard;
