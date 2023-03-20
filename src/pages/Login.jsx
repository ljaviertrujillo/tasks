import React from "react";

const Login = () => {
  return (
    <div className="content-form d-flex flex-column">
      <h2>Welcome back !</h2>
      <button type="button" className="btn btn-outline-secondary">
        {/* <FcGoogle /> */}
        Sign in with google
      </button>
      <span>Or, Login with</span>
      
      Don't have and account <a href="#"> Sign Up</a>
    </div>
  );
};

export default Login;
