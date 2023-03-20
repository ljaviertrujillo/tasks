import React, { useRef, useEffect } from "react";
import { classNames } from "../../models/classes";
import useToggle from "../../hooks/useToggle";
import { SubtaskCompleted, Options } from "./components";

const SubtaskContent = ({ subtask, remove, complete, edit }) => {
  const { title, completed } = subtask;
  const [options, toggleOptions] = useToggle(false);
  const [isEdit, toggleIsEdit] = useToggle(false);
  const subtaskTitleRef = useRef();

  useEffect(() => {
    if (isEdit) {
      subtaskTitleRef.current.focus();
      subtaskTitleRef.current.select();
    }
  }, [isEdit]);

  let subtaskTitle = "";

  return (
    <div className="flex my-1">
      <SubtaskCompleted handle={complete} completed={completed} />
      <div className={classNames("flex flex-row w-full justify-between h-6 rounded-md", options ? 'bg-dark opacity-70' : null)}>
        <div
          className={classNames(
            "subtask flex w-ful hover:bg-dark hover:opacity-70 w-full cursor-pointer rounded-md transition-all px-1",
            options ? "justify-between" : "justify-between"
          )}
          onClick={toggleOptions}
        >
          {isEdit ? (
            <input
              type="text"
              ref={subtaskTitleRef}
              value={title}
              onBlur={toggleIsEdit}
            />
          ) : (
            <span
              className={classNames(
                completed ? "text-done text line-through" : "text-darkgray"
              )}
            >
              {title[0].toUpperCase() + title.replace(title[0], '')}
            </span>
          )}
        </div>
        {options ? (
          <Options
            trashHandle={remove}
            isEdit={isEdit}
            toggleIsEdit={toggleIsEdit}
            editHandle={edit}
            title={subtaskTitle}
            subtask={subtask}
            options={toggleOptions}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SubtaskContent;
