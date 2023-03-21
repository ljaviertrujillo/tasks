import React, { useContext, useState } from "react";
import '../../styles/subtask.scss'
import SubtaskForm from "../Form/SubtaskForm";
import SubtaskContent from "../pure/SubtaskContent";
import { ProjectContext } from "../../Provider/ProjectProvider";
import { SubtasksMenu } from '../pure/components'
import { addNewSubtask, completedSubtask, deleteSubtask } from "../../firebase/projectController";
import { initializeProjects } from "../../App";


const SubtaskList = ({ task }) => {
  const { state, dispatch } = useContext(ProjectContext);
  const { projects } = state
  const [subtaskForm, setSubtaskForm] = useState(false);

  const taskId = task.id;
  const { subtasks } = task;

  let projectId = null
    projects.map(project => {
      const {tasks} = project
      let task = tasks.find(task => task.id === taskId)
      if(task){
        projectId = project.id
      }
    })

  const addSubtask = async (subtask) => {
    await addNewSubtask(projectId, taskId, subtask)
    initializeProjects(dispatch)
    setSubtaskForm(!subtaskForm)
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

  return (
    <>
      <SubtasksMenu 
        subtasks={subtasks} 
        subtaskForm={subtaskForm} 
        setSubtaskForm={() => setSubtaskForm(!subtaskForm)} />
      {subtaskForm 
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
