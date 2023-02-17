import React from "react";
import Login from "../component/home/Login";
import Signup from "../component/home/Signup";

import "./home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="card loginSignup mx-auto my-5">
        <div
          className="nav nav-tabs justify-content-center pt-3"
          id="nav-tab"
          role="tablist"
        >
          <button
            className="nav-link active"
            id="nav-login-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-login"
            type="button"
            role="tab"
            aria-controls="nav-login"
            aria-selected="true"
          >
            Login
          </button>
          <button
            className="nav-link"
            id="nav-signup-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-signup"
            type="button"
            role="tab"
            aria-controls="nav-signup"
            aria-selected="false"
          >
            Sign Up
          </button>
        </div>
        <div className="tab-content tabItem " id="nav-tabContent">
          <div
            className="tab-pane fade show active "
            id="nav-login"
            role="tabpanel"
            aria-labelledby="nav-login-tab"
          >
            <Login />
          </div>
          <div
            className="tab-pane fade "
            id="nav-signup"
            role="tabpanel"
            aria-labelledby="nav-signup-tab"
          >
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
