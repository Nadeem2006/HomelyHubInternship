import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!passwordCurrent || !password || !passwordConfirm) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.patch(
        "/v1/rent/user/updateMyPassword",
        {
          passwordCurrent,
          password,
          passwordConfirm,
        }
      );

      toast.success("Password updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Update password error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5 updateprofile">
          <form onSubmit={submitHandler}>
            <h1 className="password_title">Update Password</h1>

            <div className="form-group">
              <label htmlFor="passwordCurrent_field">
                Current Password
              </label>

              <input
                type="password"
                id="passwordCurrent_field"
                className="form-control"
                value={passwordCurrent}
                onChange={(e) =>
                  setPasswordCurrent(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">
                New Password
              </label>

              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_confirm_field">
                New Password Confirm
              </label>

              <input
                type="password"
                id="new_password_confirm_field"
                className="form-control"
                value={passwordConfirm}
                onChange={(e) =>
                  setPasswordConfirm(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="btn-block py-3 password-btn"
              disabled={loading}
            >
              {loading
                ? "Updating Password..."
                : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;