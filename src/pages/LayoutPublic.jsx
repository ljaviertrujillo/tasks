import React from "react";
import { Outlet } from "react-router-dom";

const LayoutPublic = () => {
  return (
    <>
      <div className="sign d-flex flex-row">
        <div className="task-image">ddfddff</div>
        <div className="main d-flex justify-content-center align-items-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutPublic;
