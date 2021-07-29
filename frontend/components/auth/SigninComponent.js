import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { signin, authenticate, isAuth } from "../../actions/auth";

const SigninComponent = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "grrtvnlw@gmail.com",
    password: "myfavpassword",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });

    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // TODO: save user token to cookie
        // TODO: save user info to local storage
        // TODO: authenticate user
        authenticate(data, () => {
          router.push(`/`);
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

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
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
          <button className="btn btn-primary">Signin</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </>
  );
};

export default SigninComponent;
