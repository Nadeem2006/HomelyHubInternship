import React from "react";
import "../../css/ForgetPassword.css";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";

const ForgetPassword = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },

    onSubmit: async ({ value }) => {
      try {
        await axiosInstance.post(
          "/v1/rent/user/forgotPassword",
          {
            email: value.email,
          }
        );

        toast.success(
          "If that email is registered, a reset link has been sent"
        );
      } catch (error) {
        console.error("Forgot password error:", error);

        toast.error(
          error.response?.data?.message ||
            "Unable to send reset email"
        );
      }
    },
  });

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <h1 className="password_title">
              Forget Password
            </h1>

            <form.Field name="email">
              {(field) => (
                <div className="form-group">
                  <label htmlFor="email_field">
                    Enter Email
                  </label>

                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    required
                  />
                </div>
              )}
            </form.Field>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn-block py-3 password-btn"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;