import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [message, setMessage] = useState("");
  var [messageDisplay, setMessageDisplay] = useState("d-none");

  const navigate = useNavigate();

  const SubmitForm = async (e) => {
    e.preventDefault();
    var request = await axios
      .post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      })
      .then((response) => {
        setMessageDisplay("d-block alert-danger");
        setMessage(response.data.message);
        if (response.data.stat === true) {
          setMessageDisplay("d-block alert-success");
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
              <div className={"alert " + messageDisplay} role="alert">
                {message}
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

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

              <small className="d-block text-center my-3">OR</small>

              <Link to="/signup" className="btn d-block mx-auto btn-secondary">
                Sing Up
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
