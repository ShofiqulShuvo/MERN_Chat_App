import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);

  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialState);

  const [picture, setPicture] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(picture);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label w-100 fw-bold">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="loginpassword" className="form-label fw-bold">
            Password:
          </label>
          <div className="input-group">
            <input
              type={showPass ? "text" : "password"}
              className="form-control"
              id="loginpassword"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPass(!showPass)}
            >
              <FaEye />
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="picture" className="form-label fw-bold">
            Profile Picture:
          </label>
          <input
            type="file"
            className="form-control"
            id="picture"
            accept={"image/png" && "image/jpg" && "image/jpeg"}
            onChange={handlePictureChange}
            required
          />
        </div>

        <div className="mb-2">
          <button type="submit" className="btn btn-sm btn-primary w-100">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
