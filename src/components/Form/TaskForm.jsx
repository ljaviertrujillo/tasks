import React from "react";
import { Task } from '../../models/project.class.js';

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { VscSave } from "react-icons/vsc";

const TaskForm = ({ add }) => {
  const today = new Date().toISOString().slice(0, 10)
  const initialValues = {
    title: "",
    dueDate: "",
    lastUpdate: today,
  };

  const taskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    dueDate: Yup.date(),
    lastUpdate: Yup.date()
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskSchema}
      onSubmit={(values, { resetForm }) => {
        const newTask = new Task (
          values.title,
          values.dueDate,
          today
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

            <div className="formDueDate">
              <Field type="date" name="dueDate" className="form-control"
              min={today} />
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
