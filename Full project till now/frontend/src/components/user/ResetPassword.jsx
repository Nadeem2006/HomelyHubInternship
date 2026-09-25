import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },

    onSubmit: async ({ value }) => {
      try {
        setLoading(true);

        await axiosInstance.patch(
          `/v1/rent/user/resetPassword/${token}`,
          {
            password: value.password,
            passwordConfirm: value.passwordConfirm,
          }
        );

        toast.success("Password has been changed successfully");
        navigate("/login");
      } catch (error) {
        console.error("Reset password error:", error);

        toast.error(
          error.response?.data?.message ||
            "Unable to reset password. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <h1 className="password_title">New Password</h1>

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  value.length < 6
                    ? "Password must be at least 6 characters"
                    : undefined,
              }}
            >
              {(field) => (
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>

                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />

                  {field.state.meta.errors}
                </div>
              )}
            </form.Field>

            <form.Field
              name="passwordConfirm"
              validators={{
                onChangeListenTo: ["password"],
                onChange: ({ value, fieldApi }) =>
                  value !==
                  fieldApi.form.getFieldValue("password")
                    ? "Password don't match"
                    : undefined,
              }}
            >
              {(field) => (
                <div className="form-group">
                  <label htmlFor="confirm_password_field">
                    Password Confirm
                  </label>

                  <input
                    type="password"
                    id="confirm_password_field"
                    className="form-control"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />

                  {field.state.meta.errors}
                </div>
              )}
            </form.Field>

            <button
              id="new_password_button"
              type="submit"
              className="btn-block py-3 password-btn"
              disabled={loading}
            >
              {loading ? "Changing Password..." : "Set Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;