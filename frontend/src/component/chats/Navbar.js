import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import SearchOffcanbus from "./SearchOffcanbus";
import { logout } from "../../app/features/userSlice";
import ProfileModal from "../ProfileModal";

import "./navbar.css";
import { getChatName } from "../../utility/chatPageLogic";
import { goChatFromNotification } from "../../app/features/chatSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const [viewProfile, setViewProfile] = useState(false);

  const { userData } = useSelector((state) => state.user);
  const { notification } = useSelector((state) => state.chat);

  return (
    <>
      <nav className="chat-page-navbar navbar navbar-dark">
        <div className="container px-2">
          <div>
            <SearchOffcanbus />
          </div>

          <h3 className="navbar-brand">Chats</h3>

          <div className="d-flex align-items-center pe-1">
            {/* notification Dropdown */}
            <div className="dropdown ">
              <button
                className="notification-dropdown me-2 btn btn-sm btn-primary rounded-circle position-relative dropdown-toggle"
                type="button"
                id="notificationDropDown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaBell />
                {notification.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {notification.length}
                  </span>
                )}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="notificationDropDown"
              >
                {!notification.length ? (
                  <li>
                    <p className="dropdown-item m-0">no new notification</p>
                  </li>
                ) : (
                  notification.map((n, i) => {
                    const { chat } = n;

                    return (
                      <li key={i}>
                        <button
                          className="dropdown-item m-0"
                          onClick={() => dispatch(goChatFromNotification(n))}
                        >
                          <span>new message from </span>
                          <span>
                            {chat.isGroupChat
                              ? chat.chatName
                              : getChatName(userData, chat.users)}
                          </span>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>

            {/* profile dropdown */}
            <div className="dropdown ">
              <button
                className="profile-dropdown btn border-0 text-white dropdown-toggle"
                type="button"
                id="profileDropDown"
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
                aria-labelledby="profileDropDown"
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
