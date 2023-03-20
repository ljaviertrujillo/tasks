import React, { useRef, useState } from "react";
import { STATUS } from "../../models/status.enum";
import { Task } from "../../models/task.class";
import "../../styles/Tasks/task-form.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskForm = ({ add }) => {
  const initialValues = {
    tag: "",
    tagColor: "#0ED387",
    name: "",
    description: "",
    date: "",
  };

  const newTaskSchema = Yup.object().shape({
    tag: Yup.string().required("Tag is required"),
    tagColor: Yup.string(),
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Task description is required"),
    date: Yup.date().required("Due date is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newTaskSchema}
      onSubmit={(values, { resetForm }) => {
        const newTask = new Task(
          values.name,
          values.description,
          values.date,
          STATUS.TODO,
          values.tag,
          values.tagColor,
          [],
          []
        );
        resetForm();
        add(newTask);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        }) => (
        <Form>
          <div className="form-header p-2">
            <div className="tag pb-2 d-flex justify-content-between align-items-center">
              <Field
                type="text"
                name="tag"
                placeholder="Tag"
                className="tag-name form-control form-control-sm"
              />
              <Field
                type="color"
                className="tag-color form-control form-control-color"
                title="Choose tag color"
                value={values.tagColor}
                onChange={handleChange}
                onBlur={handleBlur}
                name="tagColor"
              />
            </div>
            {errors.tag && touched.tag && <div>{errors.tag}</div>}
            <Field
              type="text"
              name="name"
              placeholder="Task Name"
              className="form-control"
              autoFocus
            />
            {errors.name && touched.name && <div>{errors.name}</div>}
          </div>
          <div className="form-body p-2">
            <Field
              as="textarea"
              name="description"
              placeholder="Task Description"
              className="form-control input"
            />
            {errors.description && touched.description && (
              <div>{errors.description}</div>
            )}
            <div className="form-duedate mt-2 mb-2 d-flex justify-content-between align-items-center">
              <i className="bi bi-flag-fill" />
              <Field
                type="date"
                name="date"
                min="2021-01-01"
                className="form-control form-control-sm"
              />
            </div>
            {errors.date && touched.date && <div>{errors.date}</div>}
            <button
              type="submit"
              className="btn btn-outline-success"
              disabled={isSubmitting}
            >
              <i className="bi bi-save2"></i> Save
            </button>
          </div>
          {/* TODO: Add Members */}
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
