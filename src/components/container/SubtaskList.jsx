import React, { useContext, useState } from "react";
import SubtaskForm from "../Form/SubtaskForm";
import SubtaskContent from "../pure/SubtaskContent";
import { ProjectContext } from "../../Provider/ProjectProvider";
import { SubtasksMenu } from '../pure/components'
import { addNewSubtask, completedSubtask, deleteSubtask } from "../../firebase/projectController";
import { initializeProjects } from "../../App";


const SubtaskList = ({ task }) => {
  const { state, dispatch } = useContext(ProjectContext);
  const {subtaskForm } = state;
  const taskId = task.id;
  const { subtasks } = task;

  const addSubtask = async (subtask) => {
    const projectId = task.projectId
    subtask.projectId = projectId
    subtask.taskId = taskId
    await addNewSubtask(subtask)
    initializeProjects(dispatch)
    showSubtaskForm()
  };

  const removeSubtask = async (subtask) => {
    await deleteSubtask(subtask)
    initializeProjects(dispatch)
  };

  const completeSubtask = async (subtask) => {
    await completedSubtask(subtask)
    initializeProjects(dispatch)
  }

  const showSubtaskForm = () => {
    dispatch({
      type: 'SUBTASK_FORM'
    })
  }

  return (
    <>
      <SubtasksMenu 
        subtasks={subtasks} 
        subtaskForm={subtaskForm} 
        showSubtaskForm={showSubtaskForm} />
      {subtaskForm 
        ? <SubtaskForm add={addSubtask}/> 
        : null}
      {subtasks.map((subtask, index) => {
        return (
          <SubtaskContent
            key={index}
            subtask={subtask}
            complete={() => completeSubtask(subtask)}
            remove={() => removeSubtask(subtask)}
          />
        );
      })}
    </>
  );
};

export default SubtaskList;
