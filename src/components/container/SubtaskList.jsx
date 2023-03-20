import React, { useContext, useEffect } from "react";
import '../../styles/subtask.scss'
import SubtaskForm from "../Form/SubtaskForm";
import SubtaskContent from "../pure/SubtaskContent";
import { ProjectContext } from "../../Provider/ProjectProvider";
import useToggle from "../../hooks/useToggle";
import { SubtasksMenu } from '../pure/components'
import { addNewSubtask, completedSubtask, deleteSubtask } from "../../firebase/projectController";
import { initializeProjects } from "../../App";


const SubtaskList = ({ projectId, task }) => {
  const { dispatch } = useContext(ProjectContext);
  const taskId = task.id;
  const { subtasks } = task;
  const [showSubtaskForm, toggleSubtaskForm] = useToggle(false)

  const addSubtask = async (subtask) => {
    await addNewSubtask(projectId, taskId, subtask)
    initializeProjects(dispatch)
    toggleSubtaskForm();
  };

  const removeSubtask = async (subtaskId) => {
    await deleteSubtask(projectId, taskId,subtaskId)
    initializeProjects(dispatch)
  };

  const completeSubtask = async (subtaskId) => {
    const completed = subtasks.find(subtask => subtask.id === subtaskId).completed
    await completedSubtask(projectId, taskId, subtaskId,completed)
    initializeProjects(dispatch)
  }

  // const editSubtask = (title, subtask) => {
  //   console.log(title)

  // }

  return (
    <>
      <SubtasksMenu 
        subtasks={subtasks} 
        showForm={showSubtaskForm} 
        toggleForm={toggleSubtaskForm} />
      {showSubtaskForm 
        ? <SubtaskForm add={addSubtask}/> 
        : null}
      {subtasks.map((subtask, index) => {
        return (
          <SubtaskContent
            key={index}
            subtask={subtask}
            complete={() => completeSubtask(subtask.id)}
            remove={() => removeSubtask(subtask.id)}
          />
        );
      })}
    </>
  );
};

export default SubtaskList;
