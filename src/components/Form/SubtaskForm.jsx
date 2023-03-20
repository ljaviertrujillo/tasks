import React from 'react'
import { Formik, Field, Form, } from "formik";
import * as Yup from "yup";

import { Subtask } from '../../models/project.class.js';
import { VscSave } from "react-icons/vsc";
const SubtaskForm = ( { add } ) => {

    const initialValues = {
        title: '',
    }

    const newSubtaskSchema= Yup.object().shape({
        title: Yup.string().required('Subtask title is required'),
    })

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={newSubtaskSchema}
        onSubmit={(values, { resetForm }) => {
            const newSubtask = new Subtask (
                values.title
            )
            resetForm()
            add(newSubtask)
        }}
        >
        {({ isSubmitting }) => (
            <Form className='d-flex flex-row align-items-center'>
                <Field
                    type="text"
                    name="title"
                    placeholder="Enter subtask title"
                    className="form-control m-2"
                    required
                    autoFocus
                />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className='d-flex align-items-center btn save-subtask'
                    >
                        <VscSave />
                    </button>
            </Form>
        )}
      
    </Formik>
  )
}

export default SubtaskForm
