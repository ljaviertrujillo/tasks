import { Formik, Form, Field  } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { User } from '../../models/user.class'

const SignUpForm = ({ add }) => {
    const initialValues = {
        name: '',
        lastName:'',
        email:'',
        password:'',
        image:'',
    }

    const userSignupSchema = Yup.object().shape({
        name: Yup.string().required('Name required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email().required(''),
        password: Yup.string().min(8).max(255).required('Password is required'),
        image: Yup.string()
    })

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={userSignupSchema}
        onSubmit={(values, { resetForm }) => {
            const newuser = new User (
                values.name,
                values.lastName,
                values.email,
                values.password,
                values.image
            )
            resetForm()
            add(newuser)
        }}
        >
        { ({ errors, touched, isSubmitting }) => (
            <Form>
                <Field 
                    type='text' 
                    name='name' 
                    placeholder='Enter your Name'
                    className='form-control' 
                />
                <Field 
                    type='text' 
                    name='lastName' 
                    placeholder='Enter your Last Name'
                    className='form-control' 
                />
                <Field 
                    type='email' 
                    name='email' 
                    placeholder='Enter your Email'
                    className='form-control' 
                />
                <Field 
                    type='password' 
                    name='password' 
                    placeholder='Enter your Password'
                    className='form-control' 
                />
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className='d-flex align-items-center btn btn btn-success'
                >
                    Send
                </button>
                

            </Form>
        )
            
        }
      
    </Formik>
  )
}

export default SignUpForm
