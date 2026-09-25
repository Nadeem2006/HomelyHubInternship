import React, { useEffect, useState } from "react";
import ProgressSteps from "../ProgressSteps";
import { Link } from "react-router-dom";
import "../../css/Profile.css";
import LoadingSpinner from "../LoadingSpinner";
import moment from "moment";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/v1/rent/user/me"
        );

        console.log("Profile response:", data);

        setUser(data.user);
      } catch (error) {
        console.error("Profile error:", error);

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

  return (
    <>
      <ProgressSteps profile />

      <div className="row justify-content-around mt-5">
        {loading && <LoadingSpinner />}

        {user && !loading && (
          <div className="col-6 col-md-6 profile object-fit-cover">
            <div className="avatars">
              <figure className="avatar-profile text-center">
                <img
                  className="rounded-circle w-100 h-100"
                  src={user.avatar?.url}
                  alt="avatar"
                />
              </figure>

              <h3>Welcome {user.name}!</h3>
            </div>

            <div className="userinfo">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Joined On</h4>
              <p>
                {moment(user.createdAt).format("MMMM Do YYYY")}
              </p>

              <div className="buttons">
                <Link
                  to="/editprofile"
                  id="edit_profile"
                  className="btn btn-block my-5"
                >
                  Edit Profile
                </Link>

                <Link
                  to="/user/updatepassword"
                  className="btn btn-block my-5 mx-4"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;