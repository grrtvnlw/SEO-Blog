import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { signup, isAuth } from "../../actions/auth";

const SignupComponent = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "Gerrit",
    email: "grrtvnlw@gmail.com",
    password: "myfavpassword",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });

    const user = { name, email, password };

    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            placeholder="Type your name"
            value={name}
          />
        </div>

        <div className="form-group">
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Type your email"
            value={email}
          />
        </div>

        <div className="form-group">
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Type your password"
            value={password}
          />
        </div>

        <div>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </>
  );
};

export default SignupComponent;
