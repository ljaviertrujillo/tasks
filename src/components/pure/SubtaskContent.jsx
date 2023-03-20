import React, { useRef, useEffect } from "react";
import { classNames } from "../../models/classes";
import useToggle from "../../hooks/useToggle";
import { SubtaskCompleted, Options } from "./components";

const SubtaskContent = ({ subtask, remove, complete, edit }) => {
  const { title, completed } = subtask;
  const [options, toggleOptions] = useToggle(false);
  const [isEdit, toggleIsEdit] = useToggle(false)
  const subtaskTitleRef = useRef()

  useEffect(() => {
    if (isEdit) {
      subtaskTitleRef.current.focus();
      subtaskTitleRef.current.select();
    }
  }, [isEdit]);

  const subtaskCompleted = {
    color: "#01AD93",
    textDecoration: "line-through",
  };

  const subtaskPending = {
    color: "#282828",
  };

  let subtaskTitle=''

  return (
    <div
      className={classNames(
        "subtask d-flex",
        options ? "justify-content-between" : null
      )}
    >
      <div className="d-flex align-items-center">
        <SubtaskCompleted handle={complete} completed={completed} />
        {isEdit ? (
          <input 
            type='text' 
            ref={subtaskTitleRef}
            value={title}
            onBlur={toggleIsEdit}
          />
        ):(
          <span
          className="subtask-title "
          style={completed ? subtaskCompleted : subtaskPending}
          onClick={toggleOptions}
        >
          {title}
        </span>
        )}
        
      </div>
      {options ? <Options trashHandle={remove} isEdit={isEdit} toggleIsEdit={toggleIsEdit} editHandle={edit} title={subtaskTitle} subtask={subtask}/> : null}
    </div>
  );
};

export default SubtaskContent;
