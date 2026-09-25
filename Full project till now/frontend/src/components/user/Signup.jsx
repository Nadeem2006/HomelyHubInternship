import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";
import { axiosInstance } from "../../utils/axios";
import LoadingSpinner from "../LoadingSpinner";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const {
    name,
    email,
    password,
    passwordConfirm,
    phoneNumber,
  } = user;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirm ||
      !phoneNumber
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axiosInstance.post(
        "/v1/rent/user/signup",
        user
      );

      console.log("Signup response:", data);

      toast.success("Account created successfully");

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);

      const message =
        error.response?.data?.message ||
        "Unable to create account";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <div className="row wrapper">
        {loading && <LoadingSpinner />}

        {!loading && (
          <form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            className="col-10 col-lg-5"
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>

              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>

              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>

              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirm_field">
                Confirm Password
              </label>

              <input
                type="password"
                id="passwordConfirm_field"
                className="form-control"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber_field">
                Phone Number
              </label>

              <input
                type="text"
                id="phoneNumber_field"
                className="form-control"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChange}
                required
              />
            </div>

            <button
              id="register_button"
              type="submit"
              className="loginbutton btn-block py-3"
            >
              REGISTER
            </button>
          </form>
        )}
      </div>
    </Fragment>
  );
};

export default Signup;