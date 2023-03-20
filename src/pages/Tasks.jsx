import React from "react";
import { useLocation } from "react-router-dom";
import TaskList from "../components/container/TaskList";

const Tasks = () => {
  const location = useLocation()
  console.log(location.pathname)


  return (
    <TaskList />
  );
};

export default Tasks;
