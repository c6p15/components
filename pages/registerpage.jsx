import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../components/registerValidation";
import axios from "axios";

function Register() {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: ""

  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const handleInput = e => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(Validation(values));
    if(errors.username === "" && errors.email === "" && errors.password === ""){
      try{
        const res = axios.post('http://localhost:8800/register', values);
        console.log(res)
        alert('Created this user.')
        navigate("/");
      }catch (err){
        console.log(err);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-item-center bg-primary vh-100">
      <div className="bg-white p-3 rounded">
      <h2>Sign up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
          <div className="mb-3">
            <label>email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && <span className="text-danger"> {errors.email}</span>}
          </div>
            <label>Username:</label>
            <input
              type="username"
              name="username"
              value={values.username}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.username && <span className="text-danger"> {errors.username}</span>}
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && <span className="text-danger"> {errors.password}</span>}      
          </div>
          <div className="align-item-center">
            <button type="submit" className="btn btn default border w-100 bg-light rounded-0 text-decoration-none">Sign up</button>
          </div>
          <p>
            Already have an account? <Link to="/login" className="btn btn default border w-100 bg-light rounded-0 text-decoration-none">Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
