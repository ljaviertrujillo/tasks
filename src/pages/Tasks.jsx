import React, { useContext, useState } from "react";
import { useLocation, useMatch, Outlet } from "react-router-dom";
import SecondaryMenu from "../components/container/SecondaryMenu";
import TaskList from "../components/container/TaskList";
import { ProjectContext } from "../Provider/ProjectProvider";

const Tasks = () => {

  return (
    <div className="flex flex-col gap-2">
      <SecondaryMenu />
      <TaskList />
    </div>
  );
};

export default Tasks;
