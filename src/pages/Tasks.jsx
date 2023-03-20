import React, { useContext, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import ProjectData from "../components/container/ProjectData";
import TaskList from "../components/container/TaskList";
import { ProjectContext } from "../Provider/ProjectProvider";

const Tasks = () => {

  return (
    <div>
      <TaskList />
    </div>
  );
};

export default Tasks;
