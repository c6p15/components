import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../components/loginValidation";
import axios from "axios";

function Login() {const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = Validation(values);
    setErrors(err);

    await new Promise((resolve) => setTimeout(resolve));

    if (!err.email && !err.password) {
      axios.post("http://localhost:5000/login", values)
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            navigate("/randomizer");
          } else {
            alert(res.data.error || "No record existed.");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-item-center bg-primary vh-100">
      <div className="bg-white p-3 rounded">
        <h2>Sign in</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger"> {errors.email}</span>
            )}
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
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}
          </div>
          <div className="align-item-center">
            <button
              type="submit"
              className="btn btn default border w-100 bg-light rounded-0 text-decoration-none"
            >
              Sign in
            </button>
          </div>
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="btn btn default border w-100 bg-light rounded-0 text-decoration-none"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
