import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [password2, setPassword2] = useState("");
  var [message, setMessage] = useState("");
  var [messageDisplay, setMessageDisplay] = useState("d-none");

  const navigate = useNavigate();
  const SubmitForm = async (e) => {
    e.preventDefault();
    var request = await axios
      .post("http://127.0.0.1:8000/api/signup", {
        name,
        email,
        password,
        password2,
      })
      .then((response) => {
        setMessageDisplay("d-block");
        setMessage(response.data.message);
        if (response.data.stat === true) {
          navigate("/login");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto mt-5">
            <form
              className="shadow p-3 rounded"
              onSubmit={SubmitForm}
              method="post"
            >
              <div
                className={"alert alert-danger " + messageDisplay}
                role="alert"
              >
                {message}
              </div>
              <div className="mb-3">
                <label for="name" className="form-label">
                  Name
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="password2" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>

              <small className="d-block text-center my-3">OR</small>

              <Link to="/login" className="btn d-block mx-auto btn-secondary">
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
