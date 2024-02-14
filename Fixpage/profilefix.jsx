
import React, { useState } from "react";

function UserProfile() {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    status:"",
  });


  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            <strong>Username:</strong> {values.username}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {values.email}
          </p>
          <p className="card-text">
            <strong>Status:</strong>{" "}
            {values.status === "admin" ? "Admin" : "User"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
