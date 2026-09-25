import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";
import { axiosInstance } from "../../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axiosInstance.post(
        "/v1/rent/user/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", data);

      toast.success("User has logged in successfully");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error.response?.data?.message ||
        "Login failed. Please check your email and password.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="row wrapper">
        {loading && <LoadingSpinner />}

        {!loading && (
          <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler}>
              <h1 className="mb-3">Login</h1>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>

                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>

                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Link
                to="/user/forgotPassword"
                className="float-right mb-4"
              >
                Forgot Password?
              </Link>

              <button
                id="login_button"
                type="submit"
                className="loginbutton btn-block py-3"
              >
                LOGIN
              </button>

              <Link to="/signup" className="float-right mt-3">
                New User?
              </Link>
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Login;