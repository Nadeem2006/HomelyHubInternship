import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Filter from "./Filter";
import toast from "react-hot-toast";
import "../../css/AiTripPlanner.css";
import { axiosInstance } from "../../utils/axios";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { data } = await axiosInstance.get("/v1/rent/user/me");

        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    checkLogin();
  }, [location.pathname]);

  const logoutUser = async () => {
    try {
      await axiosInstance.get("/v1/rent/user/logout");

      setUser(null);
      setIsAuthenticated(false);

      toast.success("User has logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const refreshFunction = () => {
    // Keep your existing refresh logic here if needed
  };

  return (
    <>
      <nav className="header row sticky-top">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="logo"
            onClick={refreshFunction}
          />
        </Link>

        {isHomePage && (
          <div className="search_filter">
            <Search />
            <Filter />

            <Link to="/ai-trip-planner" className="ai-trip-link">
              <span className="material-symbols-outlined">
                auto_awesome
              </span>
              <span>Trip Genie</span>
            </Link>
          </div>
        )}

        {!isAuthenticated && !user && (
          <Link to="/login" className="login-tip">
            <span className="material-symbols-outlined web_logo">
              account_circle
            </span>

            <span className="login-tip-text">
              You are not logged in. Please login
            </span>
          </Link>
        )}

        {isAuthenticated && user && (
          <div className="dropdown">
            <span
              className="material-symbols-outlined web_logo dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  className="user-img"
                  alt="user"
                />
              ) : (
                "account_circle"
              )}
            </span>

            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="/profile">
                  My Account
                </Link>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;