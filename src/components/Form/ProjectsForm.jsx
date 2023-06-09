import React from 'react'
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { Project } from '../../models/project.class'

import { VscSave } from "react-icons/vsc";

const ProjectsForm = ( { add } ) => {
    const today = new Date().toISOString().slice(0, 10)
    const initialValues = {
        title:'',
        description:'',
        dueDate: '',
        lastUpdate: today,
        image: '',
    }

    const newProjectSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        dueDate: Yup.date().required('Due date is required'),
        lastUpdate : Yup.date()
    })

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={newProjectSchema}
        onSubmit={(values, {resetForm}) => {
            const project = new Project (
                values.title,
                values.description,
                values.dueDate,
                today
            )
            resetForm()
            add(project)
        }}
        >
        {({isSubmitting}) => (
            <Form>
                <Field 
                    type='text'
                    placeholder='Project Name'
                    name='title'
                    className='form-control'
                    required
                    autoFocus
                    />
                <Field 
                    type='text'
                    placeholder='Project Description'
                    name='description'
                    className='form-control'
                    required
                />
                <Field 
                    type='date'
                    name='dueDate'
                    min={today}
                    required/>
                    
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
  )
}

export default ProjectsForm
