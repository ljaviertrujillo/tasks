import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProjectContext } from "../../Provider/ProjectProvider";

export const resetView = (dispatch) => {
    dispatch({
        type: 'RESET_VIEW'
    })
}

const SecondaryMenu = () => {
  const { state, dispatch } = useContext(ProjectContext);
  const { tasksView } = state;

  const location = useLocation();
  let buttonStyle = "";

  const handleTaskView = (view) => {
    dispatch({
      type: "TASKS_VIEW",
      payload: view,
    });
  };

  const buttonStyles = (view) => {
    if (tasksView === view) {
      return (buttonStyle =
        "text-xl py-2 text-blue text-semibold cursor-default font-semibold");
    } else {
      return (buttonStyle =
        "text-xl py-2 text-darkgray transition-colors hover:text-blue");
    }
  };

  useEffect(()=>{
    resetView(dispatch)
    
  }, [location])

  return (
    <>
      <ul className="flex flex-row gap-10 p-2 rounded-lg bg-primary">
        {location.pathname !== "/tasks" ? (
          <li>
            <button 
                type="button" 
                className={buttonStyles("dashboard")}
                onClick={() => handleTaskView("dashboard")}
                >
              DashBoard
            </button>
          </li>
        ) : null}
        <li>
          <button
            type="button"
            onClick={() => handleTaskView("board")}
            className={buttonStyles("board")}
          >
            Board
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleTaskView("list")}
            className={buttonStyles("list")}
          >
            List
          </button>
        </li>
        {location.pathname !== "/tasks" ? (
          <li>
            <button 
                type="button" 
                onClick={() => handleTaskView("files")}
                className={buttonStyles("files")}
                >
              Files
            </button>
          </li>
        ) : null}
      </ul>
    </>
  );
};

export default SecondaryMenu;
