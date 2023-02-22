import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import SearchOffcanbus from "./SearchOffcanbus";
import { logout } from "../../app/features/userSlice";
import ProfileModal from "../ProfileModal";

import "./navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const [viewProfile, setViewProfile] = useState(false);

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <nav className="chat-page-navbar navbar navbar-dark">
        <div className="container px-2">
          <div>
            <SearchOffcanbus />
          </div>

          <h3 className="navbar-brand">My Chat App</h3>

          <div className="d-flex align-items-center pe-1">
            <button className="me-2 btn btn-sm btn-primary rounded-circle position-relative">
              <FaBell />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                5
              </span>
            </button>

            {/* dropdown */}
            <div className="dropdown ">
              <button
                className="btn border-0 text-white dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="navbar-user-image border rounded-circle me-1"
                  src={userData.picture}
                  alt=""
                />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <button
                    className="dropdown-item btn"
                    onClick={() => setViewProfile(true)}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {viewProfile && (
        <ProfileModal setViewProfile={setViewProfile} data={userData} />
      )}
    </>
  );
};

export default Navbar;
