import React, { Fragment, useEffect, useState } from "react";
import "../../css/Profile.css";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";
import LoadingSpinner from "../LoadingSpinner";

const EditProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      avatar: "",
    },

    onSubmit: async ({ value }) => {
      const updatedFields = {};

      if (value.name !== (user?.name || "")) {
        updatedFields.name = value.name;
      }

      if (value.phoneNumber !== (user?.phoneNumber || "")) {
        updatedFields.phoneNumber = value.phoneNumber;
      }

      if (value.avatar && value.avatar !== (user?.avatar?.url || "")) {
        updatedFields.avatar = value.avatar;
      }

      if (Object.keys(updatedFields).length === 0) {
        toast("No changes made");
        return;
      }

      try {
        setUpdating(true);

        const { data } = await axiosInstance.patch(
          "/v1/rent/user/updateMe",
          updatedFields
        );

        console.log("Profile update response:", data);

        setUser(data.data.user);

        toast.success("Profile Updated");

        navigate("/profile");
      } catch (error) {
        console.error("Profile update error:", error);

        toast.error(
          error.response?.data?.message ||
            "Unable to update profile"
        );
      } finally {
        setUpdating(false);
      }
    },
  });

  // Get the currently logged-in user
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/v1/rent/user/me"
        );

        console.log("Edit profile user:", data);

        setUser(data.user);

        form.setFieldValue("name", data.user.name || "");
        form.setFieldValue(
          "phoneNumber",
          data.user.phoneNumber || ""
        );

        form.setFieldValue(
          "avatar",
          data.user.avatar?.url || ""
        );

        setAvatarPreview(
          data.user.avatar?.url ||
            "https://i.pravatar.cc/150?img=3"
        );
      } catch (error) {
        console.error("Get profile error:", error);

        toast.error(
          error.response?.data?.message ||
            "Unable to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const onChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setAvatarPreview(reader.result);
      form.setFieldValue("avatar", reader.result);
    };

    reader.readAsDataURL(file);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5 updateprofile">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <form.Field name="name">
              {(field) => (
                <div className="form-group">
                  <label htmlFor="name_field">Name</label>

                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="phoneNumber">
              {(field) => (
                <div className="form-group">
                  <label htmlFor="phoneNumber_field">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    id="phoneNumber_field"
                    className="form-control"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="avatar">
              {(field) => (
                <div className="form-group">
                  <label htmlFor="avatarupdate">
                    Avatar
                  </label>

                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <img
                          src={avatarPreview}
                          className="rounded-circle"
                          alt="Avatar Preview"
                        />
                      </figure>
                    </div>

                    <div className="custom-file">
                      <input
                        type="file"
                        name={field.name}
                        className="custom-file-input"
                        id="avatarupdate"
                        accept="image/*"
                        onChange={onChange}
                      />

                      <label
                        className="custom-file-label"
                        htmlFor="avatarupdate"
                      >
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </form.Field>

            <button
              type="submit"
              className="update-btn btn-block"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;