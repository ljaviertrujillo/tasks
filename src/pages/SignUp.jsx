import React from 'react'
import SignUpForm from '../components/Form/SignUpForm'


const SignUp = () => {

  function addUser(newUser){
    console.log(newUser)
  }

  return (
    <div>
      <SignUpForm add={addUser} />
    </div>
  )
}

export default SignUp
