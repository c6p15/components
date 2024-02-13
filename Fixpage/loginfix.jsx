import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Loginfix = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleInput = e => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
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
            {errors.email && <span className="text-danger"> {errors.email}</span>}
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
            <button type="submit" className="btn btn default border w-100 bg-light rounded-0 text-decoration-none">Sign in</button>
          </div>
          <p>
            Don't have an account? <Link to="/regisfix" className="btn btn default border w-100 bg-light rounded-0 text-decoration-none">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Loginfix;