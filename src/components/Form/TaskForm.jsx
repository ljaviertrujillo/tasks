import React from "react";
import { Task } from '../../models/project.class.js';

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { VscSave } from "react-icons/vsc";

const TaskForm = ({ add }) => {
  const initialValues = {
    title: "",
    description: "",
    dueDate: "",
  };

  const taskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.date(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskSchema}
      onSubmit={(values, { resetForm }) => {
        const newTask = new Task (
          values.title,
          values.description,
          values.dueDate
        );
        resetForm();
        add(newTask);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="formHeader">
            <Field
              type="text"
              name="title"
              placeholder="Task Title"
              className="form-control formTaskTitle"
            />
            
          </div>
          <div className="formBody">
            <Field
              type="text"
              name="description"
              placeholder="Task Description"
              className="form-control formTaskDescription"
            />
    
            <div className="formDueDate">
              <Field type="date" name="dueDate" className="form-control" />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-success buttonTaskForm"
            disabled={isSubmitting}
          >
            <VscSave />
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
