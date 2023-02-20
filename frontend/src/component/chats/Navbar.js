import React from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import SearchOffcanbus from "./SearchOffcanbus";
import { logout } from "../../app/features/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container px-2">
        <div>
          <SearchOffcanbus />
        </div>

        <h3 className="navbar-brand">My Chat App</h3>

        <div className="d-flex align-items-center ">
          <button className=" btn btn-sm btn-primary rounded-circle position-relative">
            <FaBell />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              5
            </span>
          </button>

          {/* dropdown */}
          <div className="ms-2 dropdown">
            <button
              className="btn border-0 text-white dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                className="navbar-user-image border rounded-circle"
                src={userData.picture}
                alt=""
              />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link className="dropdown-item" to={"/"}>
                  Profile
                </Link>
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
  );
};

export default Navbar;
